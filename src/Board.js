import React from 'react';
import { MenuBar } from './MenuBar.js';
import './css/Board.css';

export class Board extends React.Component {
  render() {
    return (
      <div>
        <MenuBar clickHandler={this.props.clickHandler} score={this.props.score} gameWidth={this.props.gameWidth}/>
        <div className="board-background"
          style={{width: this.props.gameWidth, height: this.props.gameHeight}}>

        </div>
      </div>
    );
  }
}
