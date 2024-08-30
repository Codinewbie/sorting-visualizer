import React from 'react';

const SpeedSlider = ({ min, max, value, onChange ,disabled}) => {
  return (
    <div className="flex flex-col  items-center ">
    <div className="flex justify-between w-full  text-sm text-gray-400">
        <span>Slow</span>
        <span>Speed</span>
        <span>Fast</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className={`w-full h-2 mt-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      />
    </div>
  );
};

export default SpeedSlider;
