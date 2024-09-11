import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFadeOutComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeOut(true);
    }, 2500); // Delay setting fadeOut to true until after the fadeIn animation (2s) completes
  
    return () => clearTimeout(timeout);
  }, []);
  

  // After fade-out animation completes, trigger callback
  useEffect(() => {
    if (fadeOut && onFadeOutComplete) {
      onFadeOutComplete();
    }
  }, [fadeOut, onFadeOutComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <h1 className="splash-title">Welcome to YJN ERP!</h1>
        <p className="splash-subtitle">Preparing your dashboard...</p>
        <div className="loading-animation"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
