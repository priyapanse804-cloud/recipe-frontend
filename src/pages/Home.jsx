import React, { useState } from "react";
import images from "../assets/images.jpeg";
import RecipeItems from "../components/RecipeItems"
import { useNavigate } from "react-router";
import Model from "../components/Model";
import InputForm from "../components/InputForm";
import { useLoaderData } from "react-router";

const Home = () => {
const data = useLoaderData();
  
console.log("Loader Data:",data );
  const navigate=useNavigate()
  const[isOpen,setIsOpen]=useState(false)
  const addRecipe=()=>{
    let token=localStorage.getItem("token")
    if(token)
    navigate("/addRecipe")
  else{
    setIsOpen(true)
  }
  }
  return (
    <div className="bg-gray-50">
      
     
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16">
        
        {/* Left Side */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Food Recipe
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            Food recipes are detailed instructions that guide people in preparing 
            different types of dishes. A recipe typically includes the name of the dish, 
            a list of ingredients required, step-by-step cooking instructions, and the 
            estimated preparation or cooking time.Food recipes are an important part of culinary culture and are often passed down through generations. They reflect traditions, regional flavors, and cooking techniques from different parts of the world. Recipes also help individuals learn new cooking skills, experiment with flavors, and maintain a balanced diet by understanding the ingredients used. Whether written in cookbooks, shared online, or created personally, food recipes play a significant role in everyday cooking and food creativity.
          </p>

          <button onClick={addRecipe} className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition duration-300">
            Share your Recipe
          </button>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src={images}
            alt="food"
            className="w-72 h-72 object-cover rounded-7xl shadow-lg"
          />
        </div>
      </section>

      {/* Wave Background */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#d4f6e9"
            fillOpacity="1"
            d="M0,256L80,218.7C160,181,320,107,480,112C640,117,800,203,960,213.3C1120,224,1280,160,1360,128L1440,96L1440,320L0,320Z"
          ></path>
        </svg>
      </div>
         {(isOpen) && <Model onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Model>}

     <div className="recipe">
     <RecipeItems recipes={data} />


     </div>
    </div>
  );
};

export default Home;
