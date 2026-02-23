import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  helperText, 
  icon: Icon, 
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
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5
            text-gray-900 placeholder-gray-500
            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
            dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-blue-400 dark:focus:ring-blue-400/20
            transition-colors duration-200
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;