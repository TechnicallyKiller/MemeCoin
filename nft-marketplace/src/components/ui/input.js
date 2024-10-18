// src/components/ui/Input.js
import React from 'react';

export const Input = ({ placeholder, value, onChange, className = '', type = 'text' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 ${className}`}
    />
  );
};
