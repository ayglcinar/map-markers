import React from 'react';
import '../styles/FancyButton.css';

export default function FancyButton({ text }) {

  return (
    <div className="buttonContainer">
      <button className="fancyButton">
        {text}
      </button>
    </div>
  );
}
