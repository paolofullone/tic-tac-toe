import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// tentei implementar um try catch para caso não preencha os nomes e não consegui.

// try {

// } catch (error) {

// }

let x = prompt('Insert 1st player Letter:');
let o = prompt('Insert 2nd player Letter:');
x = x.slice(0, 5);
o = o.slice(0, 5);

if (x === o) {
  alert('Gotta have two different letters');
  window.location.reload();
}

// limitar caracteres no input (slice?)
// botão reload
// em caso de empate alerta com reload

// class Square extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: null };
//   }
//   render() {
//     return (
//       <button className='square' onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     );
//   }
// }

// In React, function components are a simpler way to write components that only contain a render method and don’t have their own state. Instead of defining a class which extends React.Component, we can write a function that takes props as input and returns what should be rendered. Function components are less tedious to write than classes, and many components can be expressed this way.

// Replace the Square class with this function:

function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// Note

// When we modified the Square to be a function component, we also changed onClick={() => this.props.onClick()} to a shorter onClick={props.onClick} (note the lack of parentheses on both sides).

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? `${x}` : `${o}`;
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
    // console.log('clicou');
  }

  // xIsNext: !this.state.xIsNext alterna true/false para cada click

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const squares = this.state.squares.slice();
    console.log(squares);

    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = `E o ganhador é: ${winner}!!!`;
    } else if (squares.includes(null)) {
      status = `Próximo Jogador: ${this.state.xIsNext ? `${x}` : `${o}`}.`;
    } else {
      alert('Deu empate, vamos jogar de novo?');
      window.location.reload();
    }

    // else if contém null em squares próximo jogador
    // else, alerta com empate e reload

    return (
      <div>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className='board-row'>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className='board-row'>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='game-info'>
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
