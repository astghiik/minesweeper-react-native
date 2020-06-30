export const gameState = s => {
    return {
        type: 'IS_START',
        payload: s
    }
}

export const setMines = coordinates => {
    return {
        type: 'SET_MINES',
        payload: coordinates
    }
}

export const setNumbers = number => {    // number = [*field index*, number]
    return {
        type: 'SET_NUMBERS',
        payload: number
    }
}

export const setFlag = field => {
    return {
        type: 'SET_FLAG',
        payload: field
    }
}

export const removeFlag = field => {
    return {
        type: 'REMOVE_FLAG',
        payload: field
    }
}

export const openArea = field => {
    return {
        type: 'OPEN',
        payload: field
    }
}

export const newGame = () => {
    return {
        type: 'START_NEW_GAME'
    }
}