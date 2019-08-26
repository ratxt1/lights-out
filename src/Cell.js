import React, {Component} from 'react'
import "./Cell.css"


/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 * 
 * - coord: y-x coordinate of the cell
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

class Cell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    // call up to the board to flip cells around this cell
    // console.log("evt in handleclick", evt)
    // debugger
    console.log(this.props)
    this.props.flipCellsAroundMe(this.props.coord);
  }

  render() {
    let classes = "Cell" + (this.props.isLit ? " Cell-lit" : "");

    return (
        <td className={classes} onClick={this.handleClick} />
    )
  }
}


export default Cell

