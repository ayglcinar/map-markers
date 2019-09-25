import React from 'react';
import '../styles/FancyButton.css';

export default function FancyButton({ text, onClick }) {

  return (
    <div className="buttonContainer">
      <button
        className="fancyButton"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
