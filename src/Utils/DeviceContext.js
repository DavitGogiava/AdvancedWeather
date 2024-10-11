import React, { createContext, useState, useEffect } from 'react';

const DeviceContext = createContext();

const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <DeviceContext.Provider value={isMobile}>
      {children}
    </DeviceContext.Provider>
  );
};

export { MobileProvider, DeviceContext };
