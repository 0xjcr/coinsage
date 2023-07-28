import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import React, { useState } from 'react';
import TrackedCoins from './TrackedCoins';
import MyPortfolio from './MyPortfolio';

const Tabs = ({
  selectedCoins,
  onRemoveItem,
  myPortfolio,
  onRemoveFromPortfolio,
}) => {
  const [activeTab, setActiveTab] = useState('Tracking');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=''>
      {/* Tab buttons */}
      <div className='flex justify-start mt-6 '>
        <button
          className={`${
            activeTab === 'Tracking'
              ? 'text-slate-700  border-b-2 border-cyan-500 px-4 py-1 '
              : 'text-gray-500 border-b-2 px-4 py-1'
          } text-lg font-medium`}
          onClick={() => handleTabClick('Tracking')}
        >
          <TrackChangesIcon
            className={`${
              activeTab === 'Tracking' ? 'text-cyan-500' : 'text-gray-500'
            } mr-2`}
          />
          Tracking
        </button>
        <button
          className={`${
            activeTab === 'MyPortfolio'
              ? 'text-slate-700  border-b-2 border-cyan-500 px-4 py-1 '
              : 'text-gray-500 border-b-2 px-4 py-1'
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
      {activeTab === 'MyPortfolio' && (
        <MyPortfolio
          myPortfolio={myPortfolio}
          onRemoveItem={onRemoveFromPortfolio}
        />
      )}
    </div>
  );
};

export default Tabs;
