import React from 'react';
import './css/MenuBar.css';

export class MenuBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { score: this.props.score };
  }

  render() {
    return (
      <div className="MenuBar" style={{width: this.props.gameWidth}}>
        <button className="reset-button" onClick={this.props.clickHandler}>Reset</button>
        <label className="score">
          Score: {this.state.score}
        </label>
      </div>
    );
  }
}
