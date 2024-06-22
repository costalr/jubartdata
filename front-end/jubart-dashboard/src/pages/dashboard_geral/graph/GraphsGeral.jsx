import React from 'react';
import MidPriceGraph from './graphs/MidPriceGraph';
import VolumeGraph from './graphs/VolumeGraph';
import TradeGraph from './graphs/TradeGraph';
import './GraphsGeral.css';

function GraphsGeral() {
  return (
    <div className="graphs">
      <div className="graph-container">
        <TradeGraph />
      </div>
      <div className="graph-container">
        <VolumeGraph />
      </div>
      <div className="graph-container">
        <MidPriceGraph />
      </div>
    </div>
  );
}

export default GraphsGeral;
