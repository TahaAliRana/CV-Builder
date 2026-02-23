import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Tabs = ({ 
  tabs, 
  defaultTab = 0, 
  variant = 'default',
  className = '' 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const variants = {
    default: {
      list: 'border-b border-gray-200 dark:border-gray-700',
      tab: (active) => `
        px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors
        ${active 
          ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
          : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
        }
      `,
    },
    pills: {
      list: 'flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
      tab: (active) => `
        px-4 py-2 font-medium text-sm rounded-md transition-all
        ${active 
          ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400' 
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
        }
      `,
    },
    underline: {
      list: 'flex gap-6',
      tab: (active) => `
        pb-2 font-medium text-sm border-b-2 transition-colors
        ${active 
          ? 'text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
          : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400'
        }
      `,
    },
  };

  const style = variants[variant];

  return (
    <div className={className}>
      {/* Tab List */}
      <div className={`flex ${style.list}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={style.tab(activeTab === index)}
          >
            {tab.icon && <span className="mr-2 inline-flex">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;