import React, { useState } from "react";
import axios from "axios"
const InputForm = ({setIsOpen}) => {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    const[isSignUp,setIsSignUp]=useState(false)
    const[error,setError]=useState("")


    const handleSubmit=async(e)=>{
      e.preventDefault()

      let endpoint=(isSignUp) ? "signUp" : "login"

      await axios.post(`http://localhost:5000/${endpoint}`,{email,password})
      .then((res)=>{
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        setIsOpen(false)
      })
      .catch(err => {
  console.error(err);
  setError(err.response?.data?.error || "Something went wrong!");
});
    }

  return (
   <div className="">
  <div className=" max-w-md bg-white shadow-2xl rounded-3xl p-8 border border-orange-100">

    {/* Heading */}
    <h2 className="text-3xl font-bold text-center text-orange-600 mb-6">
      {isSignUp ? "Create Account 🍽️" : "Welcome Back 👋"}
    </h2>

    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="bg-orange-600 text-white py-2.5 rounded-xl font-semibold hover:bg-orange-700 transition duration-300 shadow-md"
      >
        {isSignUp ? "Sign Up" : "Login"}
      </button>

      {/* Error */}
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      {/* Toggle */}
      <p
        onClick={() => setIsSignUp((prev) => !prev)}
        className="cursor-pointer text-sm text-center text-gray-600 hover:text-orange-600 transition"
      >
        {isSignUp
          ? "Already have an account? Login"
          : "Don't have an account? Sign Up"}
      </p>

    </form>
  </div>
</div>
  );
};

export default InputForm;
