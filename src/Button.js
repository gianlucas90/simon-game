import './Button.css';
import React from 'react';
import { Howl, Howler } from 'howler';

const SoundPlay = (src) => {
  const sound = new Howl({ src, html5: true });
  sound.play();
};

const Button = (props) => {
  // Properties
  const { color, url, active, playerTurn } = props;
  // Functions
  const { onGamePlayer } = props;

  const onClickButton = (src) => {
    if (playerTurn) {
      SoundPlay(src);
      onGamePlayer(color);
    }
  };
  return (
    <button
      onClick={() => onClickButton(url)}
      className={`button ${color} ${active ? 'active' : ''}`}
    ></button>
  );
};

export default Button;
