import React from 'react';
import '../styles/Header.css';

export default function Header({ text }) {
    return (
        <div className="titlecontainer">
            <h1>{text}</h1>
        </div>
    );
}
