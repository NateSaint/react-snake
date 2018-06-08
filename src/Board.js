import React from 'react';
import { MenuBar } from './MenuBar.js';
import { Square } from './Square.js';
import './css/Board.css';

export class Board extends React.Component {
  render() {
    // Create JSX elements for each snake block
    let snake = [], i = 0;
    this.props.snake.forEach((snakeBlock) => {
      snake.push(<Square key={i++} className="snake" xPos={snakeBlock.x} yPos={snakeBlock.y} />);
    });

    return (
      <div>
        <MenuBar clickHandler={this.props.clickHandler} score={this.props.score} gameWidth={this.props.gameWidth} />
        <div className="board-background"
          style={{width: this.props.gameWidth, height: this.props.gameHeight}}>
          <Square className="food" xPos={this.props.foodX} yPos={this.props.foodY} />
          {snake}
        </div>
      </div>
    );
  }
}
