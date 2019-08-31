import React from 'react'

import Square from './Square'

import { Grid } from 'semantic-ui-react'

import './Board.css'
class Board extends React.Component {
  //Move to game component
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xiSNext: true
  //   }
  // }

  //Square state looks like this:
  // [
  //   'O', null, 'X',
  //   'X', 'X', 'O',
  //   'O', null, null,
  // ]

  //In React it's conventional to use on[Event] names for props which represents events
  //and handle[Event] for the methods which handles the event

  //There are 2 ways of changing data:
  //  Directly mutate the data by directly changinge the data's value
  //  **Replace the data with a new copy which has the desired changes

  //Replacing data with a new copy allows us:
  // to keep previous versions intact to allow undo and redo
  // detecing changes becomes difficult, as it is modified directly
  // helps to build pure components, immutable data can easily determine if changes has been made

  // handleClick(i) {
  //   //Slice creats a copy of the array, we did not pass a parameter, so it copies the entire array
  //   //We modify the "copy array" and modify the array at position "i" with "X" and save this new array as our current state
  //   const squares = this.state.squares.slice()

  //   //To ignore a click if someone has won the game or if a square is already filled
  //   if (gameServices.calculateWinner(squares) || squares[i]) {
  //     //Return ends this function
  //     return
  //   }

  //   squares[i] = this.state.xiSNext ? 'X' : 'O'
  //   this.setState({ squares: squares, xiSNext: !this.state.xiSNext })
  // }

  renderSquare(i) {
    //Each square will now recieve a value prop that will either X, O or null
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <Grid>
        <Grid.Row className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </Grid.Row>
        <Grid.Row className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </Grid.Row>
        <Grid.Row className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </Grid.Row>
      </Grid>
    )
  }
}
export default Board
