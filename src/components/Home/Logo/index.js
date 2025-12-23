import React, { useEffect, useRef } from 'react';
import ProfileImage from '../../../assets/images/pral.jpeg';
import './index.scss';

const Logo = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Animate container
    if (containerRef.current) {
      containerRef.current.style.opacity = 1;
    }

    // Animate image with delay
    const timer = setTimeout(() => {
      if (imageRef.current) {
        imageRef.current.style.opacity = 1;
        imageRef.current.style.transform = 'scale(1)';
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="logo-container" ref={containerRef}>
      <div className="image-wrapper">
        <img
          className="profile-image"
          ref={imageRef}
          src={ProfileImage}
          alt="Praladh Chaulagain"
        />
        <div className="image-glow"></div>
      </div>
    </div>
  );
};

export default Logo;
