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
        "https://recipeapp-1-4ajc.onrender.com/recipe",
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
    <div className="min-h-screen flex items-start justify-center px-4 py-10">
    <div className="w-full max-w-xl">
      <div className="bg-white border border-orange-100 rounded-2xl shadow-sm shadow-orange-100/50 p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Edit Your Recipe
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Update the recipe details and save your changes.
          </p>
        </div>

        <form onSubmit={onHandleSubmit} className="space-y-6">
          {/* Title */}
          <div className="flex flex-col items-start">
            <label className="mb-2 text-sm font-semibold text-slate-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Chocolate Cake"
              onChange={onHandleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition focus:border-orange-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Time */}
          <div className="flex flex-col items-start">
            <label className="mb-2 text-sm font-semibold text-slate-700">
              Time
            </label>
            <input
              type="text"
              name="time"
              placeholder="e.g. 45 mins"
              onChange={onHandleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition focus:border-orange-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Ingredients */}
          <div className="flex flex-col items-start">
            <label className="mb-2 text-sm font-semibold text-slate-700">
              Ingredients
            </label>
            <textarea
              name="ingredients"
              rows="4"
              placeholder="List ingredients here..."
              onChange={onHandleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition resize-none focus:border-orange-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Instructions */}
          <div className="flex flex-col items-start">
            <label className="mb-2 text-sm font-semibold text-slate-700">
              Instructions
            </label>
            <textarea
              name="instruction"
              rows="4"
              placeholder="Step by step instructions..."
              onChange={onHandleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition resize-none focus:border-orange-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Recipe Image */}
          <div className="flex flex-col items-start">
            <label className="mb-2 text-sm font-semibold text-slate-700">
              Recipe Image
            </label>
            <input
              type="file"
              name="file"
              onChange={onHandleChange}
              className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700 hover:file:bg-orange-200 focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 active:scale-[0.99]"
          >
            Edit Recipe
          </button>
        </form>
      </div>
    </div>
  </div>

  );
};

export default AddFoodRecipe;