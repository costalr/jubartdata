// DataCardGeral.jsx

import React from 'react';
import './DataCardGeral.css'; // Importe o arquivo de estilos se necessário

const DataCardGeral = ({ title, value, className }) => {
    return (
        <div className={`data-card ${className}`}>
            <p>{value}</p>
            <span>{title}</span>
        </div>
    );
};

export default DataCardGeral;
