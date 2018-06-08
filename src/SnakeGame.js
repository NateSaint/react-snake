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
    this.gameLoop = this.gameLoop.bind(this);
    this.foodCollision = this.foodCollision.bind(this);
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
   * Game loop - runs on each iteration of the timer
   */
  gameLoop() {
    let snakeBlock = this.state.snake;

    // Update the snake
    let i;
    for (i = snakeBlock.length - 1; i >= 1; i--) {
		  snakeBlock[i].x = snakeBlock[i - 1].x;
		  snakeBlock[i].y = snakeBlock[i - 1].y;
	  }

    // Update snake based on direction
    switch (this.state.direction) {
      case 'up': snakeBlock[0].y -= this.state.snakeSpeed; break;
      case 'down': snakeBlock[0].y += this.state.snakeSpeed; break;
      case 'left': snakeBlock[0].x -= this.state.snakeSpeed; break;
      case 'right': snakeBlock[0].x += this.state.snakeSpeed; break;
      default: console.log("breaking"); break;
    }

    // Check if food collision/snake eating food
    if (this.foodCollision()) {
      snakeBlock.push({ x: this.state.foodX, y: this.state.foodY });
      do {
        this.genRanFood();
      } while (this.foodCollision());
    }

    this.setState({ snake: snakeBlock, score: snakeBlock.length * 10 - 30 });
  }

  /**
   * Check if snake is eating food
   */
  foodCollision() {
    var matched = false;
    this.state.snake.forEach((snakeBlock) => {
      if (snakeBlock.x === this.state.foodX && snakeBlock.y === this.state.foodY) {
        matched = true;
      }
    });
    return matched;
  }

  /**
   * Randomly generate food X and Y positions and update state
   */
  genRanFood() {
    this.setState({
      foodX: Math.floor(Math.random() * (this.props.gameWidth/10)) * 10,
      foodY: Math.floor(Math.random() * (this.props.gameWidth/10)) * 10
    });
  }

  /**
   * Set the initial state of the game
   */
  setDefaultState() {
    this.setState({
      gameStart: false,
      snakeSpeed: 10,
      foodX: (this.props.gameWidth / 10) * 5,
      foodY: (this.props.gameHeight / 10) * 5,
      snake: [{x: (this.props.gameWidth / 10) * 5, y: (this.props.gameHeight / 10) * 8},
              {x: (this.props.gameWidth / 10) * 5, y: (this.props.gameHeight / 10) * 8},
              {x: (this.props.gameWidth / 10) * 5, y: (this.props.gameHeight / 10) * 8}],
      direction: 'up',
      score: 0
    });
  }

  /**
   * Boolean logic to start ot stop the game
   */
  clickHandler() {
    if (this.state.gameStart) {
      clearInterval(this.state.intervalID);
      this.setDefaultState();
    } else {
      this.setState({ gameStart: true });
      let intID = setInterval(this.gameLoop, this.props.gameTickDelay);
      this.setState({ intervalID: intID });
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
    const boardWelcome = this.state.gameStart ? (
      <Board gameHeight={this.props.gameHeight}
             gameWidth={this.props.gameWidth}
             clickHandler={this.clickHandler}
             score={this.state.score}
             keyPressHandler={this.keyPressHandler}
             snake={this.state.snake}
             foodX={this.state.foodX}
             foodY={this.state.foodY} />
    ) : (
      <Welcome clickHandler={this.clickHandler} />
    );

    return (
      <div className="SnakeGame">
        <header className="header">
          <h1 className="title">Snake</h1>
        </header>
        {boardWelcome}
      </div>
    );
  }
}
