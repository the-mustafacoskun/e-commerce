

export const MasterCardIcon = ({ 
  size = 44, 
  className = "" 
}) => {
  const width = size;
  const height = (size * 30) / 44; 

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 44 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Sol Daire */}
      <circle 
        cx="15" 
        cy="15" 
        r="15" 
        fill="currentColor" 
        fillOpacity="0.5"
      />
      {/* Sağ Daire */}
      <circle 
        cx="29" 
        cy="15" 
        r="15" 
        fill="currentColor" 
        fillOpacity="0.5"
      />
    </svg>
  );
};

