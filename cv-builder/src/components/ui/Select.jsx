import React, { forwardRef } from 'react';

const Select = forwardRef(({ 
  label, 
  options = [], 
  error, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`
          w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5
          text-gray-900
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
          dark:border-gray-600 dark:bg-gray-700 dark:text-white
          dark:focus:border-blue-400 dark:focus:ring-blue-400/20
          transition-colors duration-200
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;