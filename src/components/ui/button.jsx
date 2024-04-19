import React from 'react';

const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
