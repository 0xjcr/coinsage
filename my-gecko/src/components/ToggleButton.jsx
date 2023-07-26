import React, { useState } from 'react';

const ToggleButton = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='flex items-center'>
      <span className=''></span>
      <button
        className=' rounded-full focus:outline-none focus:shadow-outline'
        onClick={handleToggle}
      >
        {isChecked ? (
          <span
            className='transform block w-5 h-5 text-center font-bold blur shadow-lg shadow-amber-400 animate-pulse'
            role='img'
            aria-label='poop emoji'
          >
            💩
          </span>
        ) : (
          <span className='transform block  transition-transform scale-[3] '>
            💩
          </span>
        )}
      </button>
    </div>
  );
};

export default ToggleButton;