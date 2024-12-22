import React, { useState, useEffect } from 'react';
import "../components/Intro.css"

function Intro({ onAnimationEnd }) {
  const [animate, setAnimate] = useState(false);
  const name = 'SOCIAL MEDIA';

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (animate) {
      const timeout = setTimeout(() => {
        onAnimationEnd();
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [animate, onAnimationEnd]);

  return (
    <div
      className={`animation-container ${animate ? 'animate' : ''} ${
        animate && onAnimationEnd ? 'hide' : ''
      }`}
    >
      {name.split('').map((letter, index) => (
        <span key={index} className="letter" style={{ animationDelay: `${index * 50}ms` }}>
          {letter}
        </span>
      ))}
    </div>
  );
}

export default Intro;
