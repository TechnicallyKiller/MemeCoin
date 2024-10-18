// src/components/ui/Tabs.js
import React, { useState } from 'react';

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.value);

  const handleClick = (value) => {
    setActiveTab(value);
  };

  return (
    <div>
      <div className="flex border-b border-gray-200 mb-4">
        {children.map((child) => (
          <button
            key={child.props.value}
            onClick={() => handleClick(child.props.value)}
            className={`px-4 py-2 -mb-px border-b-2 ${
              activeTab === child.props.value ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'
            }`}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      {children.map((child) =>
        child.props.value === activeTab ? <div key={child.props.value}>{child}</div> : null
      )}
    </div>
  );
};

export const TabContent = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const TabsContent = ({ value, children }) => (
  <div>{children}</div>
);
