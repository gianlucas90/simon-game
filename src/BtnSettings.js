import './BtnSettings.css';
import React from 'react';

function BtnSettings(props) {
  const { strictOn, onBtnClick, name } = props;

  const renderStrict = () => {
    if (name === 'Strict') {
      return <div className={`strict ${strictOn ? 'active' : ''}`}></div>;
    }
  };
  return (
    <div className="btnSettings">
      {renderStrict()}
      <button onClick={onBtnClick} className="game-btn">
        {name}
      </button>
    </div>
  );
}

export default BtnSettings;
