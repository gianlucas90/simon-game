import './App.css';
import React from 'react';
import { Howl, Howler } from 'howler';
import Settings from './Settings';
import Pad from './Pad';

const audioclips = [
  {
    url: 'https://soundbible.com/mp3/Pew_Pew-DKnight556-1379997159.mp3',
    color: 'green',
  },
  {
    url: 'https://soundbible.com/mp3/neck_snap-Vladimir-719669812.mp3',
    color: 'red',
  },
  {
    url: 'https://soundbible.com/mp3/Click2-Sebastian-759472264.mp3',
    color: 'yellow',
  },
  {
    url: 'https://freesound.org/data/previews/320/320655_5260872-lq.mp3',
    color: 'blue',
  },
];
class App extends React.Component {
  state = {
    gameOn: false,
    gameStarted: false,
    strictOn: false,
    mistake: false,
    playerTurn: false,
    valueLight: null,
    gameNum: 0,
    combination: [],
    playerMoves: [],
  };

  toggleValue = (input) => {
    this.setState({ [input]: !this.state[input] });
  };

  playSoundPc = (comb) => {
    Howler.volume(1.0);
    // Delay between two sounds
    const interval = 1200;
    let promise = Promise.resolve();
    comb.forEach((num) => {
      promise = promise.then(() => {
        // Lights up Button
        this.setState({ valueLight: num });
        // Play sound
        const sound = new Howl({ src: audioclips[num].url, html5: true });
        sound.play();
        // Reset State After lights up
        setTimeout(
          function () {
            this.setState({ valueLight: null });
          }.bind(this),
          600
        );

        return new Promise(function (resolve) {
          setTimeout(resolve, interval);
        });
      });
    });

    promise.then(() => {
      this.setState({ playerTurn: true });
    });
  };

  restart = () => {
    this.setState(
      {
        combination: [],
        playerMoves: [],
        gameNum: 0,
        playerTurn: false,
      },
      () => setTimeout(() => this.gamePc(), 2500)
    );
  };

  // Press: Start or on increment combination
  gamePc = () => {
    const { gameOn, combination, gameNum } = this.state;
    if (gameOn) {
      // Generate new Number
      const newRandom = Math.floor(Math.random() * 4);
      const updated = [...combination];
      // Push new number at the end of combination
      updated.push(newRandom);
      // Update State
      this.setState(
        {
          gameStarted: true,
          combination: updated,
          gameNum: gameNum + 1,
        },
        // Play sound pc when done with setState
        () => {
          this.playSoundPc(this.state.combination);
        }
      );
    }
  };

  // Press: Colored button
  onGamePlayer = (color) => {
    const { playerMoves, strictOn } = this.state;
    // Shallow copy
    const updatedPlayerMoves = [...playerMoves];
    // Get index array based on color
    const index =
      color === 'green' ? 0 : color === 'red' ? 1 : color === 'yellow' ? 2 : 3;
    updatedPlayerMoves.push(index);
    // Update state
    this.setState({ playerMoves: updatedPlayerMoves }, () => {
      // Deconstruct new states
      const { combination, playerMoves } = this.state;
      let lastNumIndex = playerMoves.length - 1;
      let lastNumPlayer = playerMoves[lastNumIndex];
      console.log(
        'last num player:' + lastNumPlayer,
        combination[lastNumIndex]
      );
      // Wrong last move
      if (lastNumPlayer !== combination[lastNumIndex]) {
        console.log('its different');
        if (strictOn) {
          console.log('Start again from 1');
          this.setState(
            {
              mistake: true,
              combination: [],
              playerMoves: [],
              gameNum: 0,
              playerTurn: false,
            },
            () => setTimeout(() => this.gamePc(), 2500)
          );
          // Set mistake to false after a while
          setTimeout(
            function () {
              this.setState({ mistake: false });
            }.bind(this),
            1000
          );
        } else {
          console.log('Try again');
          this.setState(
            {
              mistake: true,
              playerMoves: [],
              playerTurn: false,
            },
            () =>
              setTimeout(() => this.playSoundPc(this.state.combination), 1500)
          );
          // Set mistake to false after a while
          setTimeout(
            function () {
              this.setState({ mistake: false });
            }.bind(this),
            1000
          );
        }
        // Correct last move
      } else {
        console.log('Correct move');
        // If played all the moves
        if (playerMoves.length === combination.length) {
          this.setState(
            {
              // mistake: false,
              playerMoves: [],
              playerTurn: false,
            },
            () => setTimeout(() => this.gamePc(), 1500)
          );
        }
      }
    });
  };

  render() {
    return (
      <div className="app">
        <div className="container">
          <Pad
            combination={this.state.combination}
            valueLight={this.state.valueLight}
            playerTurn={this.state.playerTurn}
            onGamePlayer={this.onGamePlayer}
            audioclips={audioclips}
          />
          <Settings
            gameOn={this.state.gameOn}
            gameStarted={this.state.gameStarted}
            gameNum={this.state.gameNum}
            mistake={this.state.mistake}
            strictOn={this.state.strictOn}
            toggleValue={this.toggleValue}
            gamePc={this.gamePc}
            restart={this.restart}
          />
        </div>
        <p className="instruction">
          Press start and try to repeat the sequence
        </p>
        <p className="instruction">
          Strict mode makes you start from the beginning if you fail
        </p>
      </div>
    );
  }
}

export default App;
