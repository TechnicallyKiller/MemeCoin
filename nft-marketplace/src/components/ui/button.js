// src/components/ui/Button.js
import React from 'react';

export const Button = ({ onClick, children, className = '', type = 'button' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
    >
      {children}
    </button>
  );
};
