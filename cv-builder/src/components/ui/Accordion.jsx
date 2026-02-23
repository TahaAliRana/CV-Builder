import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AccordionItem = ({ 
  title, 
  children, 
  isOpen = false, 
  onToggle,
  icon 
}) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className="font-medium text-gray-900 dark:text-white">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-400" />
        ) : (
          <ChevronDown size={20} className="text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
};

const Accordion = ({ 
  items, 
  allowMultiple = false,
  className = '' 
}) => {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndexes(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndexes(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          icon={item.icon}
          isOpen={openIndexes.includes(index)}
          onToggle={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;