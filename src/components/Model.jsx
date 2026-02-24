import React from "react";

const Model = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-96 p-6  shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-600 text-xl font-bold hover:text-black"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Model;
