import React from "react";

const Card = ({ title, subtitle, children, onClick, className = "" }) => {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <h2 className="text-xl font-bold text-purple-700 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mb-2">{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
};

export default Card;