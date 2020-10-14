import React from 'react'

const BACT_DIV = 'Bacteria Divide'
const bactDiv = pos => [BACT_DIV, pos]

const CELL_DIV = 'Cell Divide'
const cellDiv = pos => [CELL_DIV, pos]

const BACT_JUMP = 'Bacteria Jump'
const bactJump = pos => [BACT_JUMP, pos]

const CELL_JUMP = 'Cell Jump'
const cellJump = pos => [CELL_JUMP, pos]

const CELL_SELECT = 'Cell Select'
const cellSelect = pos => [CELL_SELECT, pos]

const BACT_SELECT = 'Bacteria Select'
const bactSelect = pos => [BACT_SELECT, pos]

const BACT_DESELECT = 'Bacteria Deselect'
const bactDeselect = () => [BACT_DESELECT, ]

const CELL_DESELECT = 'Cell Deselect'
const cellDeselect = () => [CELL_DESELECT, ]

const noop = () => {}

// COMPONENT EVENTS

/**
 * cases (active-cell-state, state-selection)
 * 
 * (not-mine, no-selection) => noop
 * (mine, no-selection)     => select this
 * (not-mine, selection)
 *      (this in jumps)     => reduceJump(this)
 *      (this in divs)      => reduceDiv(this)
 *      ()                  => noop
 * (mine, selection)
 *      (this.x != selection.x
 *       this.y != selection.y) => reduceSelect(this)
 *      (this.x == selection.x
 *       this.y == selection.y) => reduceDeselect()
 *      ()                      => noop
 */

 const emitLog = (socket, log, emission) => {
     console.log(log)
     socket.emit('action', emission)
 }

const handleClick = (cellState, x, y, state, socket) => _ => {

    const myTurn = isMyTurn(socket, state)
    console.log(myTurn)
    if(myTurn) {
        const mine = cellState === state.turn
        
        if(mine && !state.selected) {
            console.log('running (mine, no-selection) for socket ' + socket.id)
            state.team === 'bacteria'   ? emitLog(socket, 'bacteria select emitted', bactSelect({x, y}))
        :   state.team === 'cell'       ? emitLog(socket, 'cell select emitted', cellSelect({x, y}))
        :   noop()
        }

        else if(mine && state.selected) {            
            console.log('running (mine, selection) for socket ' + socket.id)
            x === state.selected.x && y === state.selected.y && state.team === 'bacteria' ? socket.emit('action', bactDeselect())
        :   x === state.selected.x && y === state.selected.y && state.team === 'cell' ? socket.emit('action', cellDeselect())
        :   x !== state.selected.x && y !== state.selected.y ?
                state.team === 'bacteria'   ? socket.emit('action', bactSelect({x, y}))
            :   state.team === 'cell'       ? socket.emit('action', cellSelect({x, y}))
            :   noop()
        :   noop()
        }

        else if(!mine && state.selected) {            
            console.log('running (not-mine, selection) for socket ' + socket.id)
            if(state.jumps.find(j => j.x === x && j.y === y)) {
                state.team === 'cell' && state.turn === 'cell'          ? socket.emit('action', cellJump({x, y}))
            :   state.team === 'bacteria' && state.turn === 'bacteria'  ? socket.emit('action', bactJump({x, y}))
            :   noop()
            } 
            if(state.divs.find(d => d.x === x && d.y === y)) {
                state.team === 'cell' && state.turn === 'cell'          ? socket.emit('action', cellDiv({x, y}))
            :   state.team === 'bacteria' && state.turn === 'bacteria'  ? socket.emit('action', bactDiv({x, y}))
            :   noop()
            }
        }
    }
} 

// COMPONENT

const isMyTurn = (socket, state) => 
        (state.turn === 'bacteria' && state.team === 'bacteria')
    ||  (state.turn === 'cell' && state.team === 'cell')


export const HexCell = ({cellState, x, y, socket, state}) => {

    const highlighted = state.divs.find(cell => cell.x === x && cell.y === y) && isMyTurn(socket, state)
    const jumplighted = state.jumps.find(cell => cell.x === x && cell.y === y) && isMyTurn(socket, state)

    return (
        cellState === 'invisible'      ? (<></>)
    :   /**else */                            (
        <div className={`hex-cell`}
            style={{
                gridRow: y + 1,
                gridColumn: x + 1,
                marginTop: 
                    x % 2 === 1 ? `1.25em`
                :   y % 2 === 1 ? `0`
                :  /**else */     `0`,
            }}>
            <div className={`hex-cell-top${
                                highlighted ? ' highlight-top' 
                                :             ''
                            }${
                                jumplighted ? ' jumplight-top'
                                :             ''  
                            }`}></div>
            <div className={`hex-cell-middle${
                                highlighted ? ' highlight' 
                                :             ''
                            }${
                                jumplighted ? ' jumplight'
                                :             ''
                            }`}>
                <div className={'hex-cell-'+cellState}
                    onClick={handleClick(cellState, x, y, state, socket)}>
                    <div className={'hex-cell-'+cellState+'-inner'}>{`${x},${y}`}</div>
                </div>
            </div>
            <div className={`hex-cell-bottom${
                                highlighted ? ' highlight-bottom' 
                                :             ''
                            }${
                                jumplighted ? ' jumplight-bottom'
                                :             ''
                            }`}>

            </div>
        </div>
    ))
}