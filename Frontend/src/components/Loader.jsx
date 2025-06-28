import React from "react";

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
    <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-600 shadow-lg"></div>
  </div>
);

export default Loader;