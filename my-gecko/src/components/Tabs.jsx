// Tabs.jsx
import React, { useState } from 'react';
import TrackedCoins from './TrackedCoins';
// import MyPortfolio from './MyPortfolio';

const Tabs = ({ selectedCoins, onRemoveItem }) => {
  const [activeTab, setActiveTab] = useState('Tracking');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=''>
      {/* Tab buttons */}
      <div className='flex justify-start mt-6 space-x-2'>
        <button
          className={`${
            activeTab === 'Tracking'
              ? 'text-slate-700 bg-gray-200/70 border-b-2 border-cyan-500 px-2  '
              : 'text-gray-500 border-b-2 px-2'
          } text-lg font-medium`}
          onClick={() => handleTabClick('Tracking')}
        >
          Tracking
        </button>
        <button
          className={`${
            activeTab === 'MyPortfolio'
              ? 'text-slate-700 bg-gray-200/70 border-b-2 border-cyan-500 px-2  '
              : 'text-gray-500 border-b-2 px-2'
          } text-lg font-medium`}
          onClick={() => handleTabClick('MyPortfolio')}
        >
          My Portfolio
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'Tracking' && (
        <TrackedCoins
          trackedCoins={selectedCoins}
          onRemoveItem={onRemoveItem}
        />
      )}
      {activeTab === 'MyPortfolio' && 'Portfoliooooooooo goes here'}
    </div>
  );
};

export default Tabs;
