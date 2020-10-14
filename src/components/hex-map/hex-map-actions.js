// ACTIONS

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

const DESELECT = 'Deselect'
const deselect = () => [DESELECT, null]

export { 
    DESELECT, deselect,
    BACT_DIV, bactDiv,
    CELL_DIV, cellDiv,
    BACT_JUMP, bactJump, 
    CELL_JUMP, cellJump,
    BACT_SELECT, bactSelect,
    CELL_SELECT, cellSelect
}