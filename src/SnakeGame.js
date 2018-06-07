import React from 'react';
import { Board } from './Board.js';
import { Welcome } from './Welcome.js';
import './css/SnakeGame.css';

export class SnakeGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStart: false
    }

    this.setDefaultState = this.setDefaultState.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.keyPressHandler = this.keyPressHandler.bind(this);
  }

  componentWillMount() {
    if (!this.state.gameStart) {
      this.setDefaultState();
    }
    document.addEventListener("keydown", this.keyPressHandler.bind(this));
  }

  componentWillUnMount() {
    document.removeEventListener("keydown", this.keyPressHandler.bind(this));
  }

  /**
   * Set the initial state of the game
   */
  setDefaultState() {
    this.setState({
      gameStart: false,
      snakeX: (this.props.gameWidth / 10) * 5,
      snakeY: (this.props.gameHeight / 10) * 8,
      foodX: (this.props.gameWidth / 10) * 5,
      foodY: (this.props.gameHeight / 10) * 5,
      snake: [],
      direction: 'up',
      score: 0
    });
  }

  /**
   * Boolean logic to start ot stop the game
   */
  clickHandler() {
    if (this.state.gameStart) {
      this.setDefaultState();
    } else {
      this.setState({ gameStart: true });
    }
  }

  /**
   * Change snake direction based on key pressed
   */
  keyPressHandler(event) {
    switch (event.keyCode) {
      case 38: this.setState({ direction: 'up' }); break;
      case 40: this.setState({ direction: 'down' }); break;
      case 37: this.setState({ direction: 'left' }); break;
      case 39: this.setState({ direction: 'right' }); break;
      default: this.setState({ direction: this.state.direction });
    }
  }

  render() {
    console.log(this.state);
    const boardWelcome = this.state.gameStart ? (
      <Board gameHeight={this.props.gameHeight} gameWidth={this.props.gameWidth} clickHandler={this.clickHandler} score={this.state.score} keyPressHandler={this.keyPressHandler} />
    ) : (
      <Welcome clickHandler={this.clickHandler} />
    );

    return (
      <div className="SnakeGame">
        <header className="header">
          <h1 className="title">Snake {this.state.direction}</h1>
        </header>
        {boardWelcome}
      </div>
    );
  }
}
