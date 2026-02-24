import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import images from "../assets/images.jpeg"
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios"
const RecipeItems = ({ recipes }) => {

  const navigate=useNavigate()
  
  const allRecipes = useLoaderData();
  let [deleteRecipe,setDeleteRecipe]=useState([])

  let path=window.location.pathname==="/myRecipe"?true:false

  let favItem=JSON.parse(localStorage.getItem("fav"))??[]

  const[isFavRecipe,setIsFavRecipe]=useState(false)
  console.log(allRecipes);

const recipesArray = Array.isArray(recipes)
    ? recipes
    : recipes?.recipe || [];


    useEffect(()=>{
        setDeleteRecipe(recipes)
    },[recipes])
  const onDelete=async(id)=>{
     await axios.delete(`http://localhost:5000/recipe/${id}`)
     .then((res)=>console.log(res));

    setDeleteRecipe(prev =>
      prev?.filter(recipe => recipe._id !== id)
    );     
  }


  const favRecipe=(item)=>{

    let filterItem=favItem.filter(recipe=>recipe._id!==item._id)
   favItem=favItem.filter(recipe=>recipe._id===item._id).length===0?[...favItem,item]: filterItem
    localStorage.setItem("fav",JSON.stringify(favItem))
    setIsFavRecipe(pre=>!pre)
 
  }
 return (
  <div className="flex justify-center p-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[60%]">
      {recipesArray.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        recipesArray.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/recipeDetails/${item._id}`)}
            className="bg-white  shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            {/* Image */}
           <div className="flex justify-center items-center pt-6">
  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
    <img
      src={`http://localhost:5000/images/${item.coverImage}`}
      alt={item.title}
      className="w-full h-full object-cover"
    />
  </div>
</div>

            {/* Card Body */}
            <div className="bg-green-200 mt-6 px-5 py-4">
              <h2 className="text-lg font-semibold mb-3">
                {item.title}
              </h2>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  <BsStopwatchFill />
                  {item.time}
                </div>

                {!path ? (
                  <FaHeart
                    onClick={() => favRecipe(item)}
                    className={`text-lg cursor-pointer ${
                      favItem.some(res => res._id === item._id)
                        ? "text-red-500"
                        : ""
                    }`}
                  />
                ) : (
                  <div className="flex gap-3 text-lg">
                    <Link to={`/editRecipe/${item._id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaRegEdit className="cursor-pointer" />
                    </Link>
                   <MdDelete
               onClick={(e) => {
                 e.stopPropagation();
                         onDelete(item._id);
                        }}
                         className="cursor-pointer"
                        />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);
}
export default RecipeItems