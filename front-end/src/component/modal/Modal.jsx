import React from "react";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* MODAL CONTAINER */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-fadeIn">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        {children}

      </div>
    </div>
  );
};

export default Modal;