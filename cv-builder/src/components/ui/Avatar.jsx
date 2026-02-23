import React from 'react';

const Avatar = ({ 
  src, 
  alt, 
  size = 'md', 
  status,
  className = '' 
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-6 h-6',
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className={`
            rounded-full object-cover ring-2 ring-white dark:ring-gray-700
            ${sizes[size]}
          `}
        />
      ) : (
        <div
          className={`
            rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
            flex items-center justify-center font-bold text-white
            ring-2 ring-white dark:ring-gray-700
            ${sizes[size]}
          `}
        >
          {getInitials(alt)}
        </div>
      )}
      
      {status && (
        <span
          className={`
            absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-gray-700
            ${statusSizes[size]}
            ${statusColors[status]}
          `}
        />
      )}
    </div>
  );
};

export default Avatar;