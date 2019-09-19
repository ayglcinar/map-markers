import React from 'react'
import '../styles/Header.css'

export default function Header(props) {
    return (
        <div className="title-container">
            <h1>{props.text}</h1>
        </div>
    )
}