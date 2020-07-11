import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createField } from './StartGame';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlag, removeFlag, openArea, gameState } from '../actions';
import { configs, colors } from '../constants';


function GameArea(props) {
    let {
        //  start,
        minesCoordinates,
        numbers,
        flags,
        setFlag,
        removeFlag,
        openArea,
        openedArea,
        //  gameState 
    } = props;
    let opened = [...openedArea];
    let body = [];
    const { rows, columns, mines } = configs;
    const { openedBgC, hiddenBgC } = colors;

    function openField(f) {
        // if (arguments.length === 1) e.preventDefault();

        // if (minesCoordinates.includes(f) && !flags.includes(f) && start) {    // game over         
        //     Object.assign(alertMessage, { variant: 'danger', text: 'Game Over' });
        //     opened = opened.concat(minesCoordinates);
        //     gameState(false);
        //     openArea(opened);
        //     return;
        // }

        const n = rows * columns;
        for (let i = 0; i < arguments.length; i++) {
            let field = arguments.length === 1 ? f : arguments[i];

            if (opened.includes(field) || flags.includes(field) || field < 0 || field > n - 1) continue;

            if (!numbers.includes(field)) {
                if (field % columns === 0) {
                    if (field === 0) {
                        opened.push(field);
                        openField(field + 1, field + columns, field + (columns + 1));
                    } else if (field === n - columns) {
                        opened.push(field);
                        openField(field - columns, field - (columns - 1), field + 1);
                    } else {
                        opened.push(field);
                        openField(field - columns, field - (columns - 1), field + 1, field + columns, field + (columns + 1));
                    }
                } else if ((field + 1) % columns === 0) {
                    if (field === (columns - 1)) {
                        opened.push(field);
                        openField(field - 1, field + (columns - 1), field + columns);
                    } else if (field === n - 1) {
                        opened.push(field);
                        openField(field - 1, field - columns, field - (columns + 1));
                    } else {
                        opened.push(field);
                        openField(field - columns, field - (columns + 1), field - 1, field + (columns - 1), field + columns);
                    }
                } else if (field < (columns - 1)) {
                    opened.push(field);
                    openField(field - 1, field + 1, field + (columns - 1), field + columns, field + (columns + 1));
                } else if (field > n - columns) {
                    opened.push(field);
                    openField(field - 1, field + 1, field - (columns - 1), field - columns, field - (columns + 1));
                } else {
                    opened.push(field);
                    openField(field - columns, field - (columns + 1), field - (columns - 1), field - 1, field + 1, field + (columns - 1), field + columns, field + (columns + 1));
                }
            } else {
                opened.push(field);
            }
        }

        openArea(opened);

        if (opened.length === n - mines) {
            gameState(false);
            return;
        }

    }

    console.log(configs)

    for (let i = 0; i < rows; i++) {
        let row = [];

        for (let j = 0; j < columns; j++) {
            let n = i * columns + j;
            let field = createField(n, minesCoordinates, []);
            let isOpened = openedArea.includes(n);

            row.push(
                <TouchableOpacity key={n} onPress={() => !isOpened ? openField(n) : null}>
                    <Text
                        style={[styles.text, {
                            color: field.color,
                            backgroundColor: isOpened ? openedBgC : hiddenBgC,
                        }]}
                    >
                        {isOpened ? field.q : ''}

                    </Text>
                </TouchableOpacity>
            );
        }

        body.push(
            <View key={'row' + i} style={{ flexDirection: 'row' }}>{row}</View>
        );
    }

    return (
        <View style={styles.container}>{body}</View>
    )
}




const mapStateToProps = state => {
    return {
        start: state.start,
        numbers: state.numbers,
        minesCoordinates: state.minesCoordinates,
        flags: state.flags,
        openedArea: state.openedArea
    }
}

const matchDispatchToProps = dispatch => {
    return bindActionCreators({ setFlag, removeFlag, openArea, gameState }, dispatch);
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        borderWidth: 1,
        borderColor: '#fff',
        height: 30,
        width: 30,
        fontSize: 20,
        textAlign: 'center',


    }
});

export default connect(mapStateToProps, matchDispatchToProps)(GameArea);