import React from 'react';
import './css/Square.css';

export class Square extends React.Component {
  render() {
    return (
      <div className={this.props.className}
           style={{left: this.props.xPos, top: this.props.yPos}}>
      </div>
    );
  }
}
