import MAP from '../resources/test.json'

export const loadMap = file => {
    const js = MAP
    const result = Array(10).fill(Array(10).fill(0))
        .map((arr, y) => arr.map((_, x) => {
            return(  
                js[`${x}${y}`] ? { x, y, cellState: js[`${x}${y}`] }
            :   /**else */       { x, y, cellState: 'empty' })
        })).flat()

    console.log(result)
    return result
}