import React from 'react'

import { Button } from 'semantic-ui-react'

import './Square.css'

function Square(props) {
  let color

  if (props.value === 'X') {
    color = 'red'
  }

  if (props.value === 'O') {
    color = 'blue'
  }

  return (
    <Button
      className="square-button"
      //Creating an arrow function allows us not to write "this" and also not to fire every render
      //Functions do not need ()=> this.props.onClick(), parentheses on both side.
      onClick={props.onClick}
      color={color}
    >
      {props.value}
    </Button>
  )
}

export default Square
