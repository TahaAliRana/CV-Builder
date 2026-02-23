import React from 'react';

const ProgressBar = ({ 
  current, 
  total, 
  steps = [], 
  showLabels = true,
  className = '' 
}) => {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Line */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>

      {/* Step Labels */}
      {showLabels && steps.length > 0 && (
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={`
                text-xs font-medium transition-colors duration-300
                ${index <= current 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-400 dark:text-gray-500'
                }
              `}
            >
              {step.title}
            </span>
          ))}
        </div>
      )}

      {/* Step Counter */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <span className="text-gray-500 dark:text-gray-400">
          Step {current + 1} of {total}
        </span>
        <span className="text-blue-600 dark:text-blue-400 font-medium">
          {Math.round(progress)}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;