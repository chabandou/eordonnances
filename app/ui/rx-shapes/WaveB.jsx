import React from 'react';

const WaveComponent = ({ width = 336, className = "", ...props }) => {
  return (
    <svg 
      viewBox="0 0 336 143" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path 
        d="M6.3208 123.858C6.3208 123.858 258.902 131.912 331.585 55.5608V106.85L302.821 138.74L30.7198 142.038L6.3208 123.858Z" 
        fill="#0D6761"
      />
      <path 
        d="M333.685 17.9313C266.405 103.192 0.320801 115.885 0.320801 115.885L5.20499 124.12C38.592 124.735 254.821 129.173 333.685 55.8265C337.821 49.9801 333.685 17.9313 333.685 17.9313Z" 
        fill="url(#paint0_linear_55_15)" 
        fillOpacity="0.67"
      />
      <path 
        d="M334.576 0.550781C290.251 51.9224 191.882 87.4852 113.828 108.847C195.408 96.0579 296.105 70.8846 333.685 22.4609L334.576 30.9759V0.550781Z" 
        fill="url(#paint1_linear_55_15)" 
        fillOpacity="0.14"
      />
      <defs>
        <linearGradient 
          id="paint0_linear_55_15" 
          x1="333.686" 
          y1="76.9159" 
          x2="-3.17969" 
          y2="76.9159" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0D6761"/>
          <stop offset="0.48" stopColor="#149B93"/>
          <stop offset="1" stopColor="#1BCDC2"/>
        </linearGradient>
        <linearGradient 
          id="paint1_linear_55_15" 
          x1="334.576" 
          y1="76.2033" 
          x2="3.53516" 
          y2="76.2033" 
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4B5F5E"/>
          <stop offset="0.345" stopColor="#9DC5C2" stopOpacity="0.74"/>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WaveComponent;