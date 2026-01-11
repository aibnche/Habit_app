
import React from 'react';

const BackgroundLines: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
      <svg
        className="w-full h-full"
        viewBox="0 0 400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Curved Line 1 */}
        <path
          d="M-50 100C100 200 300 100 450 400"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        {/* Curved Line 2 */}
        <path
          d="M0 800C150 600 250 800 400 400"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        {/* Curved Line 3 */}
        <path
          d="M50 -100C150 300 50 600 400 900"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
        {/* Curved Line 4 - The large looping one */}
        <path
          d="M-100 400C200 400 200 0 500 200"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        <path
          d="M400 100C200 300 50 200 -50 600"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
};

export default BackgroundLines;
