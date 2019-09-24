import React from 'react';
import '../styles/FancyButton.css';

export default function FancyButton({ text }) {

  return (
    <div class="buttonContainer">
      <button class="fancyButton" rel="nofollow noopener">
        {text}
      </button>
    </div>
  );
}
