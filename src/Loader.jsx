import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Spinner */}
      <div className="flex space-x-2">
        <div className="w-3 h-8 bg-gray-700 animate-bounce [animation-delay:-0.3s] rounded-md"></div>
        <div className="w-3 h-8 bg-gray-700 animate-bounce [animation-delay:-0.15s] rounded-md"></div>
        <div className="w-3 h-8 bg-gray-700 animate-bounce rounded-md"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-lg font-semibold text-gray-700 animate-pulse">
        Loading data...
      </p>
    </div>
  );
}

export default Loader;
