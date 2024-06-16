import React from 'react';
import './Logo.css'; // Import the CSS file for styles
import jubartLogo from './jubart-logo.png';

// Logo Component
function Logo() {
    return (    
        <div className='logo-container'>     
            {/* Logo */}
            <a href="/" className="logo">
                <img src={jubartLogo} alt="Logo Jubart Data"/>
            </a>

            <h6>PAINEL DO PESCADO</h6>
        </div>

    );
}

export default Logo;
