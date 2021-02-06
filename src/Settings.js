import './Settings.css';
import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import Display from './Display';
import BtnSettings from './BtnSettings';

const Settings = (props) => {
  // Properties
  const { gameOn, gameStarted, gameNum, mistake, strictOn } = props;
  // Functions
  const { toggleValue, gamePc, restart } = props;

  const onStrictClick = () => (gameOn ? toggleValue('strictOn') : null);
  const onStartClick = () => (gameStarted ? restart() : gamePc());

  return (
    <div className="settings">
      <h1>Simon</h1>
      <div className="row">
        <BtnSettings name={'Start'} onBtnClick={onStartClick} />
        <Display gameNum={gameNum} mistake={mistake} />
        <BtnSettings
          name={'Strict'}
          onBtnClick={onStrictClick}
          strictOn={strictOn}
        />
      </div>
      <ToggleSwitch Name="onoff" toggleValue={toggleValue} />
    </div>
  );
};

export default Settings;
