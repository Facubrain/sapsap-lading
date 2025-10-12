import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'desktop';

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const checkDeviceType = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setDeviceType(isMobile ? 'mobile' : 'desktop');
    };

    // Check on mount
    checkDeviceType();

    // Add listener for window resize
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    const handleChange = () => checkDeviceType();
    
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return deviceType;
};