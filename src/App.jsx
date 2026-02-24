import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from "axios"
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'

const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get('https://recipeapp-bdyc.onrender.com/recipe').then(res=>{
    allRecipes=res.data
  })
  return allRecipes
}

const getMyRecipe = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];
  
  console.log("USER:", user._id);

  let allRecipes = await getAllRecipes();

  console.log("RECIPES:", allRecipes.recipe);
  console.log(Array.isArray(allRecipes.recipe));

  return allRecipes.recipe.filter(item => {
    console.log("Comparing:", item.createdBy, user._id);
    return String(item.createdBy) === String(user._id);
  });

};

const getFavRecipe=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router=createBrowserRouter([

  {path:"/",element:<MainNavigation/>,children:[
    
    {path:"/",element:<Home/>,loader:getAllRecipes},

    {path:"/myRecipe",element:<Home/>,loader:getMyRecipe},

    {path:"/favRecipe",element:<Home/>,loader:getFavRecipe},

    {path:"/addRecipe",element:<AddFoodRecipe/>},

      {path:"/editRecipe/:id",element:<EditRecipe/>},

       {path:"/recipeDetails/:id",element:<RecipeDetails/>}
  ]}
])
const App = () => {
  return (
    <div>
     <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
