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
        `${import.meta.env.VITE_API_URL}/recipe`,
         
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
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        
        {/* Main Box */}
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/70 sm:p-8">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Add a New Recipe
            </h2>
          


            <p className="mt-2 text-sm text-slate-500">
              Fill in the recipe details and save it to your collection.
            </p>
          </div>


          <form onSubmit={onHandleSubmit} className="space-y-6">
            
            {/* Title */}
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="mb-2 text-sm font-semibold text-slate-700"
              >
                Recipe Title
              </label>


              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g. Chocolate Cake"
                onChange={onHandleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </div>


            {/* Time */}
            <div className="flex flex-col">
              <label
                htmlFor="time"
                className="mb-2 text-sm font-semibold text-slate-700"
              >
                Time
              </label>


              <input
                id="time"
                type="text"
                name="time"
                placeholder="e.g. 45 minutes"
                onChange={onHandleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </div>


            {/* Ingredients */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="ingredients"
                  className="text-sm font-semibold text-slate-700"
                >
                  Ingredients
                </label>


                <span className="text-xs text-slate-400">
                  Separate with commas
                </span>
              </div>


              <textarea
                id="ingredients"
                name="ingredients"
                rows="4"
                placeholder="e.g. Flour, Sugar, Eggs, Butter"
                onChange={onHandleChange}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </div>


            {/* Instructions */}
            <div className="flex flex-col">
              <label
                htmlFor="instruction"
                className="mb-2 text-sm font-semibold text-slate-700"
              >
                Instructions
              </label>


              <textarea
                id="instruction"
                name="instruction"
                rows="5"
                placeholder="Write step-by-step instructions..."
                onChange={onHandleChange}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100"
              />
            </div>


            {/* Image */}
            <div className="flex flex-col">
              <label
                htmlFor="file"
                className="mb-2 text-sm font-semibold text-slate-700"
              >
                Recipe Image
              </label>


              <label
                htmlFor="file"
                className="flex cursor-pointer items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-4 transition hover:border-slate-400 hover:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4"
                      />
                    </svg>
                  </div>


                  <span className="text-sm font-medium text-slate-700">
                    Choose recipe image
                  </span>
                </div>


                <span className="text-xs font-bold uppercase tracking-wide text-slate-600">
                  Upload
                </span>
              </label>


              <input
                id="file"
                type="file"
                name="file"
                accept="image/*"
                onChange={onHandleChange}
                className="hidden"
              />
             
            </div>


            {/* Save Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200 active:scale-[0.99]"
            >
              Save Recipe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default AddFoodRecipe;