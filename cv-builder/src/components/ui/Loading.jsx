import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <svg
      className={`animate-spin text-blue-600 ${sizes[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

const LoadingOverlay = ({ text = 'Loading...' }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
    <div className="text-center">
      <Spinner size="lg" className="mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">{text}</p>
    </div>
  </div>
);

const LoadingDots = () => (
  <span className="inline-flex items-center gap-1">
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </span>
);

const Skeleton = ({ width = '100%', height = '20px', className = '' }) => (
  <div 
    className={`
      bg-gray-200 dark:bg-gray-700 rounded animate-pulse
      ${className}
    `}
    style={{ width, height }}
  />
);

export { Spinner, LoadingOverlay, LoadingDots, Skeleton };