import React, { useEffect,useMemo,useState } from 'react'
import { Link,  useNavigate } from 'react-router'
import images from "../assets/images.jpeg"
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios"
const RecipeItems = ({ recipes }) => {

  const navigate=useNavigate()
  
  let path=window.location.pathname==="/myRecipe"?true:false
  
  
 const recipesArray = useMemo(() => {
  return Array.isArray(recipes)
    ? recipes
    : recipes?.recipe || [];
}, [recipes]);
  
  const [deleteRecipe, setDeleteRecipe] = useState(recipesArray);

 const [favItem, setFavItem] = useState(() => {
  return JSON.parse(localStorage.getItem("fav")) || [];
});


  console.log(allRecipes);


    

 useEffect(() => {
  if (window.location.pathname === "/favRecipe") {
    const fav = JSON.parse(localStorage.getItem("fav")) || [];
    setDeleteRecipe(fav);
    setFavItem(fav);
  } else {
    setDeleteRecipe(recipesArray);
  }
}, [recipesArray]);

const onDelete = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/recipe/${id}`);

    // Remove from Favourite
    const currentFav = JSON.parse(localStorage.getItem("fav")) || [];

    const updatedFav = currentFav.filter(
      (recipe) => String(recipe._id) !== String(id)
    );

    localStorage.setItem("fav", JSON.stringify(updatedFav));
    setFavItem(updatedFav);

    // Remove from current page
    setDeleteRecipe((prev) =>
      prev.filter((recipe) => String(recipe._id) !== String(id))
    );

  } catch (error) {
    console.log("Delete Error:", error.response?.data || error.message);
  }
};

const favRecipe = (item) => {
  const currentFav = JSON.parse(localStorage.getItem("fav")) || [];

  const isAlreadyFav = currentFav.some(
    (recipe) => recipe._id === item._id
  );

  const updatedFav = isAlreadyFav
    ? currentFav.filter((recipe) => recipe._id !== item._id)
    : [...currentFav, item];

  localStorage.setItem("fav", JSON.stringify(updatedFav));
  setFavItem(updatedFav);
};
 return (
  <div className="flex justify-center p-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[60%]">
      {deleteRecipe.length === 0 ? (
        <p>No recipes found</p>
      ) : (
         deleteRecipe.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/recipeDetails/${item._id}`)}
            className="bg-white  shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            {/* Image */}
           <div className="flex justify-center items-center pt-6">
  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
   <img
  src={`${import.meta.env.VITE_API_URL}/images/${item.coverImage}`}
  alt={item.title}
  onError={(e) => {
    console.log("Image URL:", e.currentTarget.src);
    console.log("Cover Image:", item.coverImage);
  }}
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
  onClick={(e) => {
    e.stopPropagation();
    favRecipe(item);
  }}
  className={`text-lg cursor-pointer ${
    favItem.some(recipe => recipe._id === item._id)
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