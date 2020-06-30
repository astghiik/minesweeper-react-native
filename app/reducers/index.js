import { combineReducers } from 'redux';
import { gameStateReducer, numbersReducer, minesReducer, flagsReducer, openedAreaReducer } from './mines-reducer';

export const allReducers = combineReducers({
    start: gameStateReducer,
    numbers: numbersReducer,
    minesCoordinates: minesReducer,
    flags: flagsReducer,
    openedArea: openedAreaReducer
});


// export const minesweeper = (state, action) => {
//     if (action.type === 'START_NEW_GAME') {
//       state = undefined;
//     }

//     return mw(state, action);
// }

