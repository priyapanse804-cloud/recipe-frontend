import React, { useState,useEffect } from "react";
import Model from "./Model";
import InputForm from "./InputForm";
import { NavLink } from "react-router";
const Navbar = () => {
  const [isOpen,setIsOpen]=useState(false)
  let token=localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(!localStorage.getItem("token"));
  let user=JSON.parse(localStorage.getItem("user"))

  

  useEffect(()=>{
 
    setIsLogin(token ? false : true)
  },[token])

  const checkLogin=()=>{
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      setIsLogin(true)
    }

    else{

      setIsOpen(true)
    }
  }
  return (
    <div>
      <header className="flex justify-between items-center px-8 md:px-20 py-4 bg-white shadow-md">
      
      {/* Logo */}
      <h2 className="text-2xl font-bold text-gray-800">
        Food Blog
      </h2>

      {/* Menu */}
      <ul className="hidden md:flex space-x-8 text-gray-600 font-medium">
        <li className="hover:text-gray-900 cursor-pointer transition"><NavLink to="/">Home</NavLink></li>
        <li onClick={()=>isLogin && setIsOpen(true)} className="hover:text-gray-900 cursor-pointer transition"><NavLink to={!isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
        <li onClick={()=>isLogin && setIsOpen(true)} className="hover:text-gray-900 cursor-pointer transition"><NavLink to={!isLogin ?"/favRecipe" : "/"}>Favourite</NavLink></li>
        <li onClick={checkLogin} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition cursor-pointer">
          {(isLogin)? "Login" : "LogOut"} {user?.email ? `(${user?. email})` :""}
        </li>
      </ul>

    </header>

   {(isOpen) && <Model onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Model>}
    </div>
  );
};

export default Navbar;
