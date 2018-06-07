import React from 'react';
import './css/Welcome.css';

export class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome-background">
        <h3>Welcome to Snake, press "Start" to play</h3>
        <button className="start-button" onClick={this.props.clickHandler}>
          Start
        </button>
      </div>
    );
  }
}
