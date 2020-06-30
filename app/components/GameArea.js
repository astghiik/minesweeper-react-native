import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createField } from './StartGame';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFlag, removeFlag, openArea, gameState } from '../actions';


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


    function openField(e, f = +e.currentTarget.dataset.i) {
        if (arguments.length === 1) e.preventDefault();

        // if (minesCoordinates.includes(f) && !flags.includes(f) && start) {    // game over         
        //     Object.assign(alertMessage, { variant: 'danger', text: 'Game Over' });
        //     opened = opened.concat(minesCoordinates);
        //     gameState(false);
        //     openArea(opened);
        //     return;
        // }

        for (let i = 0; i < arguments.length; i++) {
            let field = arguments.length === 1 ? f : arguments[i];

            if (opened.includes(field) || flags.includes(field) || field < 0 || field > 239) continue;

            if (!numbers.includes(field)) {
                if (field % 12 === 0) {
                    if (field === 0) {
                        opened.push(field);
                        openField(field + 1, field + 12, field + 13);
                    } else if (field === 228) {
                        opened.push(field);
                        openField(field - 12, field - 11, field + 1);
                    } else {
                        opened.push(field);
                        openField(field - 12, field - 11, field + 1, field + 12, field + 13);
                    }
                } else if ((field + 1) % 12 === 0) {
                    if (field === 11) {
                        opened.push(field);
                        openField(field - 1, field + 11, field + 12);
                    } else if (field === 239) {
                        opened.push(field);
                        openField(field - 1, field - 12, field - 13);
                    } else {
                        opened.push(field);
                        openField(field - 12, field - 13, field - 1, field + 11, field + 12);
                    }
                } else if (field < 11) {
                    opened.push(field);
                    openField(field - 1, field + 1, field + 11, field + 12, field + 13);
                } else if (field > 228) {
                    opened.push(field);
                    openField(field - 1, field + 1, field - 11, field - 12, field - 13);
                } else {
                    opened.push(field);
                    openField(field - 12, field - 13, field - 11, field - 1, field + 1, field + 11, field + 12, field + 13);
                }
            } else {
                opened.push(field);
            }
        }

        openArea(opened);

        if (opened.length === 520) {
            gameState(false);
            return;
        }

    }



    for (let i = 0; i < 20; i++) {
        let row = [];

        for (let j = 0; j < 12; j++) {
            row.push(
                <TouchableOpacity key={i * 12 + j} activeOpacity={i * 12 + j} data-n={i * 12 + j} onPress={(e) => { console.log(e.nativeEvent) }}>
                    <Text
                        style={[styles.text, { backgroundColor: openedArea.includes(i * 12 + j) ? '#eee' : '#ccc' }]}
                    >
                        {createField(i * 12 + j, minesCoordinates, [])}

                    </Text>
                </TouchableOpacity>
            );
        }

        body.push(
            <View style={{ flexDirection: 'row' }}>{row}</View>
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