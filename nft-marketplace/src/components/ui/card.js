// src/components/ui/Card.js
import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white shadow-lg rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="mb-4">
    <h3 className="text-xl font-semibold">{children}</h3>
  </div>
);

export const CardContent = ({ children }) => (
  <div className="text-gray-700">{children}</div>
);

export const CardFooter = ({ children }) => (
  <div className="mt-4 border-t pt-4">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold mb-2">{children}</h2>
);

export const CardDescription = ({ children }) => (
  <p className="text-gray-500 mb-4">{children}</p>
);
