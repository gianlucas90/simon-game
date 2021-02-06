import './Display.css';
import React from 'react';

const Display = (props) => {
  const { mistake, gameNum } = props;

  return (
    <div className={`display ${mistake ? 'mistake' : ''}`}>
      <p>{mistake ? '!!' : gameNum}</p>
    </div>
  );
};

export default Display;
