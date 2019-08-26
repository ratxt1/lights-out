import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.3
  }

  constructor(props) {
    super(props);
    this.state = {
      // board: this.createBoard(this.props.chanceLightStartsOn),
      board: this.createSolvableBoard(1000),
      hasWon: false
    }
    this.flipCellsAround = this.flipCellsAround.bind(this)
  }


  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  // createBoard() {
  //   let { nrows, ncols, chanceLightStartsOn } = this.props
  //   let board = [];
  //   // TODO: create array-of-arrays of true/false values
  //   for (let y = 0; y < nrows; y++) {
  //     let row = []
  //     for (let x = 0; x < ncols; x++) {
  //       row.push({
  //         coord: `${y}-${x}`,
  //         isLit: (Math.random() < chanceLightStartsOn)
  //       });
  //     }
  //     board.push(row)
  //   }
  //   return board
  // }

  createBoard(chanceLightStartsOn) {
    let { nrows, ncols} = this.props
    let board = [];
    // create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let row = []
      for (let x = 0; x < ncols; x++) {
        row.push({
          coord: `${y}-${x}`,
          isLit: (Math.random() < chanceLightStartsOn)
        });
      }
      board.push(row)
    }
    return board
  }

  createSolvableBoard(iterations) {
    let {ncols, nrows} = this.props
    let solvableBoard = this.createBoard(1)

    for (let i =0; i <iterations; i++) {
      let randY = Math.floor(Math.random() * nrows) 
      let randX = Math.floor(Math.random() * ncols) 
      solvableBoard = this.flipCellsAroundWithoutState(`${randY}-${randX}`, solvableBoard, ncols, nrows)
    }
    return solvableBoard
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAroundWithoutState(coord, board, ncols, nrows) {
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x].isLit = !board[y][x].isLit;
      }

    }
    flipCell(y, x)
    flipCell(y + 1, x)
    flipCell(y - 1, x)
    flipCell(y, x + 1)
    flipCell(y, x - 1)

    return board
  }

  flipCellsAround(coord) {
    console.log(coord)
    let { ncols, nrows } = this.props;
    let { board, hasWon } = this.state;
    // debugger
    board = this.flipCellsAroundWithoutState(coord, board, ncols, nrows)

    // win when every cell is turned off
    hasWon = this.state.board.every(row => row.every(cell => cell.isLit))

    this.setState({ board, hasWon });
  }

  makeBoardDisplay() {
    let boardDisplay = this.state.board.map((row, i) => {
      let rowDisplay = row.map(c => {
        return (
          <Cell key={c.coord} coord={c.coord} isLit={c.isLit} flipCellsAroundMe={this.flipCellsAround} />
        )
      });
      return (
        <tr key={i}>
          {rowDisplay}
        </tr>
      )
    })
    return (
      <table className="Board">
        <tbody>
          {boardDisplay}
        </tbody>
      </table>

    )
  }


  /** Render game board or winning message. */

  render() {
    
    return (


      // if the game is won, just show a winning msg & render nothing else

      // TODO

      // make table board
      (!this.state.hasWon) ? this.makeBoardDisplay(): <div>You won</div> 

    )
  }
}


export default Board;
