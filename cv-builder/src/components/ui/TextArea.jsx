import React, { forwardRef } from 'react';

const TextArea = forwardRef(({ 
  label, 
  error, 
  helperText, 
  className = '', 
  rows = 4,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full rounded-lg border border-gray-300 bg-white px-4 py-3
          text-gray-900 placeholder-gray-500
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
          dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
          dark:focus:border-blue-400 dark:focus:ring-blue-400/20
          transition-colors duration-200 resize-none
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;