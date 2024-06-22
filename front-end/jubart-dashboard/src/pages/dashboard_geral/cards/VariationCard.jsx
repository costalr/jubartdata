import React from 'react';

const VariationCard = ({ title, value, variation, className }) => {
    const isPositive = variation >= 0;
    const variationText = `${Math.abs(variation).toFixed(2)}%`;
    const arrowIcon = isPositive ? '▲' : '▼'; // Define a seta para cima (▲) se positivo e para baixo (▼) se negativo

    return (
        <div className={`data-card ${className}`}>
            <h3>{title}</h3>
            <div className={`main-value ${isPositive ? 'positive' : 'negative'}`}>
                {value}
            </div>
            <div className={`variation  ${isPositive ? 'positive' : 'negative'}`}>
                {variationText} <i className="arrow-icon">{arrowIcon}</i>
            </div>
        
        </div>
    );
};

export default VariationCard;
