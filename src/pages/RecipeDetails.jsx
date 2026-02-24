import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

const RecipeDetails = () => {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  // Fetch single recipe
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`https://recipeapp-bdyc.onrender.com/recipe/${id}`);
        console.log("DATA:", res.data); 
        setRecipe(res.data.recipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, [id]);

  // Delete Recipe
  const handleDelete = async () => {
    try {
      await axios.delete(`https://recipeapp-bdyc.onrender.com/recipe/${id}`);
      
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
   <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center px-8 py-20">

  <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">

    {/* LEFT CONTENT */}
    <div className="space-y-8">

      {/* Title */}
      <h1 className="text-4xl font-bold text-green-700">
        {recipe.title}
      </h1>

      {/* Ingredients */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ingredients
        </h2>

        <ul className="space-y-2 text-gray-600">
          {recipe.ingredients?.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Instructions
        </h2>

        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {recipe.instruction}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={() => navigate(`/editRecipe/${recipe._id}`)}
          className="px-6 py-3 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-6 py-3 border border-gray-400 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          Delete
        </button>
      </div>

    </div>

    {/* RIGHT IMAGE */}
    <div className="flex justify-center">
      <div className="w-[420px] h-[420px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-5">
        <img
          src={`https://recipeapp-bdyc.onrender.com/images/${recipe.coverImage}`}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

  </div>
</div>
);
};

export default RecipeDetails;
