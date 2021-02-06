import './Pad.css';
import React from 'react';
import Button from './Button';

const Pad = (props) => {
  // Properties
  const { audioclips, valueLight, playerTurn } = props;
  // Functions
  const { onGamePlayer } = props;

  const renderedButtonList = audioclips.map((audioclip, index) => {
    const active = valueLight === index ? true : false;
    return (
      <Button
        color={audioclip.color}
        key={index}
        url={audioclip.url}
        active={active}
        onGamePlayer={onGamePlayer}
        playerTurn={playerTurn}
      />
    );
  });

  return <div className="pad">{renderedButtonList}</div>;
};

export default Pad;
