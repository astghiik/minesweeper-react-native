import React, { useEffect } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { View, Button, Text } from "react-native";
import { setMines, setNumbers, newGame, gameState } from '../actions';

let n = [];
export const createField = (f, mines, openedArea) => {
    if (mines.includes(f)) return { q: 'x', color: 'red' };

    let q = 0;
    if (f === 0) {
        if (mines.includes(f + 1)) q++;
        if (mines.includes(f + 12)) q++;
        if (mines.includes(f + 13)) q++;
    } else if (f === 11) {
        if (mines.includes(f - 1)) q++;
        if (mines.includes(f + 11)) q++;
        if (mines.includes(f + 12)) q++;
    } else if (f === 228) {  //??????????????????????????????????????
        if (mines.includes(f - 11)) q++;
        if (mines.includes(f - 12)) q++;
        if (mines.includes(f + 1)) q++;
    } else if (f === 239) {
        if (mines.includes(f - 12)) q++;
        if (mines.includes(f - 13)) q++;
        if (mines.includes(f - 1)) q++;
    } else if (f < 11) {
        if (mines.includes(f + 11)) q++;
        if (mines.includes(f + 12)) q++;
        if (mines.includes(f + 13)) q++;
        if (mines.includes(f - 1)) q++;
        if (mines.includes(f + 1)) q++;
    } else if (f > 228) {
        if (mines.includes(f - 11)) q++;
        if (mines.includes(f - 12)) q++;
        if (mines.includes(f - 13)) q++;
        if (mines.includes(f - 1)) q++;
        if (mines.includes(f + 1)) q++;
    } else if (f % 12 === 0) {
        if (mines.includes(f - 11)) q++;
        if (mines.includes(f - 12)) q++;
        if (mines.includes(f + 12)) q++;
        if (mines.includes(f + 13)) q++;
        if (mines.includes(f + 1)) q++;
    } else if ((f + 1) % 12 === 0) {
        if (mines.includes(f - 12)) q++;
        if (mines.includes(f - 13)) q++;
        if (mines.includes(f + 11)) q++;
        if (mines.includes(f + 12)) q++;
        if (mines.includes(f - 1)) q++;
    } else {
        if (mines.includes(f - 13)) q++;
        if (mines.includes(f - 12)) q++;
        if (mines.includes(f - 11)) q++;
        if (mines.includes(f + 11)) q++;
        if (mines.includes(f + 12)) q++;
        if (mines.includes(f + 13)) q++;
        if (mines.includes(f - 1)) q++;
        if (mines.includes(f + 1)) q++;
    }

    if (q === 0) return "";

    const setColor = (q) => {
        return [
            "dodgerblue",
            "black",
            "red",
            "green",
            "yellow",
            "blue",
            "grey",
            "red",
        ][q - 1];
    };

    n.push(f);
    //let cn = area.includes(f) ? `visible text-${setColor(q)}` : "invisible";


    return {
        q,
        color: setColor(q)
    };

};

function StartGame(props) {
    n = [];
    let coordinates = [];
    const { setNumbers, setMines, newGame, gameState } = props;

    for (let i = 0; i < 25; i++) {
        let c = Math.floor(Math.random() * 240);
        if (!coordinates.includes(c)) {
            coordinates.push(c);
        } else {
            i--;
        }
    }

    const handleBtnClick = () => {
        newGame(); // reset
        n = [];
        setNumbers(n);
        setMines(coordinates);
        gameState(true);
    };

    useEffect(() => handleBtnClick(), []);

    return (
        <Button onPress={handleBtnClick} title='new' />

    );
}

const mapStateToProps = (state) => {
    return {
        minesCoordinates: state.minesCoordinates,
    };
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators(
        { setMines, setNumbers, newGame, gameState },
        dispatch
    );
};

export default connect(mapStateToProps, matchDispatchToProps)(StartGame);
