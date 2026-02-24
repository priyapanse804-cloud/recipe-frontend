import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const AddFoodRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val;

    if (e.target.name === "ingredients") {
      val = e.target.value.split(",");
    } else if (e.target.name === "file") {
      val = e.target.files && e.target.files[0];
    } else {
      val = e.target.value;
    }

    setRecipeData((pre) => ({
      ...pre,
      [e.target.name]: val
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("ingredients", JSON.stringify(recipeData.ingredients));
    formData.append("instruction", recipeData.instruction);
    formData.append("time", recipeData.time);
    if (recipeData.file) formData.append("file", recipeData.file);

    try {
      await axios.post(
        "http://localhost:5000/recipe",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
  <div className="min-h-screen flex items-start justify-center p-4 pt-10">
  <div className="w-full max-w-lg">
    <h2 className="text-2xl font-bold text-orange-600 mb-6 text-left">
      Edit Your Recipe
    </h2>
    <form onSubmit={onHandleSubmit} className="space-y-5">

      {/* Title */}
      <div className="flex flex-col items-start">
        <label className="mb-2 font-semibold text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Chocolate Cake"
          onChange={onHandleChange}
          className="border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Time */}
      <div className="flex flex-col items-start">
        <label className="mb-2 font-semibold text-gray-700">Time</label>
        <input
          type="text"
          name="time"
          placeholder="e.g. 45 mins"
          onChange={onHandleChange}
          className="border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Ingredients */}
      <div className="flex flex-col items-start">
        <label className="mb-2 font-semibold text-gray-700">Ingredients</label>
        <textarea
          name="ingredients"
          rows="4"
          placeholder="List ingredients here..."
          onChange={onHandleChange}
          className="border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
        />
      </div>

      {/* Instructions */}
      <div className="flex flex-col items-start">
        <label className="mb-2 font-semibold text-gray-700">Instructions</label>
        <textarea
          name="instruction"
          rows="4"
          placeholder="Step by step instructions..."
          onChange={onHandleChange}
          className="border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none"
        />
      </div>

      {/* Recipe Image */}
      <div className="flex flex-col items-start">
        <label className="mb-2 font-semibold text-gray-700">Recipe Image</label>
        <input
          type="file"
          name="file"
          onChange={onHandleChange}
          className="border border-gray-300 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
      </div>

      {/* Submit Button */}
      <button
         
        type="submit"
        className="bg-green-300 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-500 transition-colors shadow-md"
      >
        Edit Recipe
      </button>
    </form>
  </div>
</div>
  );
};

export default AddFoodRecipe;