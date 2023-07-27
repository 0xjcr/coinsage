import React, { useState } from 'react';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
      setIsChecked(!isChecked);
      setShowTopCoins(!showTopCoins);
  };

  return (
    <div className='flex items-center ml-2'>
      <span className=''></span>
      <button
        className=' rounded-full focus:outline-none focus:shadow-outline'
        onClick={handleToggle}
      >
        {isChecked ? (
          <span className='transform block  scale-[3] ml-1 '>
            💩
          </span>
        ) : (
          <span className='shadow-lg  '>
            <ChangeHistoryIcon className='scale-150 text-slate-900' />
          </span>
        )}
      </button>
    </div>
  );
};

export default ToggleButton;
