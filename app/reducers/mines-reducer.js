export const gameStateReducer = (state = true, action) => {
    switch (action.type) {
        case 'IS_START':
            return action.payload;

        default:
            return state;
    }
}

export const numbersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NUMBERS':
            return action.payload;

        default:
            return state;
    }
}

export const minesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MINES':
            return action.payload;

        default:
            return state;
    }
}

export const flagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FLAG':
            return [...state, action.payload];

        case 'REMOVE_FLAG':
            state.splice(state.indexOf(action.payload), 1);
            return [...state];

        default:
            return state;
    }
}

export const openedAreaReducer = (state = [], action) => {
    switch (action.type) {
        case 'OPEN':
            return action.payload;

        default:
            return state;
    }
}