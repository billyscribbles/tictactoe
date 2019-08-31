import React from 'react'
import Board from './Board'

import { Container, List, Header, Button, Grid } from 'semantic-ui-react'

import gameServices from '../services/gameServices'

import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      draw: false
    }
  }

  handleClick(i) {
    // const history = this.state.history
    // We do not grab the entire history anymore, but only grab from 0 the start to the current step number + 1
    // This slice will only retain up to the button and throw away all future steps made previously
    const history = this.state.history.slice(0, this.state.stepNumber + 1)

    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (gameServices.calculateWinner(squares) || squares[i]) {
      return
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O'

    //We are creating a history array that holds an array of squares from 0-8 with null
    //Upon click we are creating a new array using sliece called squares
    //We concat this array to the current null array (initial) and add it to our "history"
    //History will container an array of null then an array of null + 1 input and so on

    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  //Lift state up to "Game" component to determine which square was clicked

  // history = [
  //   // Before first move
  //   {
  //     squares: [
  //       null, null, null,
  //       null, null, null,
  //       null, null, null,
  //     ]
  //   },
  //   // After first move
  //   {
  //     squares: [
  //       null, null, null,
  //       null, 'X', null,
  //       null, null, null,
  //     ]
  //   },
  //   // After second move
  //   {
  //     squares: [
  //       null, null, null,
  //       null, 'X', null,
  //       null, null, 'O',
  //     ]
  //   },
  //   // ...
  // ]

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  render() {
    const history = this.state.history
    // const current = history[history.length - 1]
    // Instead of rendering the last move, we are now rendering the currently selected move according to stepNumber
    const current = history[this.state.stepNumber]
    const winner = gameServices.calculateWinner(current.squares)

    //Here we will use the map function to iterate through our array

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to start of game'

      return (
        <List.Item key={move}>
          <Button className="history-button" onClick={() => this.jumpTo(move)}>
            {desc}
          </Button>
        </List.Item>
      )
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    let fontColor
    if (winner === 'X') {
      fontColor = 'red'
    }
    if (winner === 'O') {
      fontColor = 'blue'
    }

    let draw

    if (this.state.stepNumber === 9 && winner === null) {
      draw = true
    }

    return (
      <Container fluid className="game-container">
        <br />
        <Header>TicTacToe</Header>
        <br />
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </Grid.Column>
            <Grid.Column width={8}>
              {/* Need to add status */}
              <Header as="h3">{status}</Header>
              {/* Need to add history */}
              <List>{moves}</List>
              {winner ? (
                <Header color={fontColor}>
                  Winner, Winner, Chicken Dinner!
                </Header>
              ) : null}
              {draw ? <Header>Draw ! It's a Tie!</Header> : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
      </Container>
    )
  }
}

export default Game
