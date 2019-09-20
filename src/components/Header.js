import React from 'react';
import '../styles/Header.css';

export default function Header(props) {
    const { text } = props;
    return (
        <div className="titlecontainer">
            <h1>{text}</h1>
        </div>
    );
}
