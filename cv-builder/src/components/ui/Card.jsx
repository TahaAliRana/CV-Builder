import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  padding = 'md', 
  hover = false,
  ...props 
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700
        ${paddings[padding]}
        ${hover ? 'hover:shadow-xl transition-shadow duration-300' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;