import React from 'react';
import appScreen1 from '../../assets/screen1.png';

const HeroImage = () => {
  return (
    <div className="relative mx-auto w-64 h-300px">
      <img
        src={appScreen1}
        alt="fcRivals App Interface"
        className="w-full h-auto"
      />
    </div>
  );
};

export default HeroImage; 