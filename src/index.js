import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { SnakeGame } from './SnakeGame';

ReactDOM.render(<SnakeGame gameHeight={600} gameWidth={600}/>, document.getElementById('root'));
