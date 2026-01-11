
import React from 'react';
import BackgroundLines from './BackgroundLines';

const ChevronRight = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const LandingPage: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-end min-h-screen bg-[#111111] text-white px-8 pb-16 overflow-hidden">
      {/* Background Decor */}
      <BackgroundLines />

      {/* Main Content Area */}
      <div className="relative z-10 space-y-2 mb-12 max-w-lg">
        <h1 className="text-[52px] leading-[1.05] font-extrabold tracking-tight">
          Your Money,
          <br />
          Your Control
        </h1>
        
        <div className="w-10 h-[6px] bg-white my-8 rounded-full"></div>
        
        <h2 className="text-[52px] leading-[1.05] font-extrabold tracking-tight">
          Anytime,
          <br />
          Anywhere.
        </h2>
      </div>

      {/* Navigation Buttons */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-md">
        <button 
          className="flex items-center gap-2 text-lg font-bold hover:opacity-70 transition-opacity focus:outline-none"
          onClick={() => console.log('Log in clicked')}
        >
          Log in <ChevronRight />
        </button>

        <button 
          className="bg-white text-black rounded-full px-10 py-5 flex items-center gap-10 text-lg font-bold hover:bg-gray-200 transition-all active:scale-95 focus:outline-none"
          onClick={() => console.log('Sign up clicked')}
        >
          Sign up <ChevronRight />
        </button>
      </div>

      {/* Decorative Gradient Overlay for depth */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default LandingPage;
