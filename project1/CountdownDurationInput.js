import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
    timeLbl: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    timeInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        minWidth: 75,
        textAlign: 'center',
    },
});


export default class CountdownDurationInput extends React.Component {

    static propTypes = {
        // Following is a VERY BAD way for sync-ing durations across components tree.
        defaultDurations: PropTypes.object.isRequired,
        // func that takes object with 4 keys; work minutes and seconds and break minutes and seconds.
        handleSomeDurationChanged: PropTypes.func.isRequired,
    }

    state = {
        ...this.props.defaultDurations
    }

    onTextChange = key => val => {
        const valAsNum = +val
        if (0 <= valAsNum && valAsNum < 60) {
            console.log(`Setting state key=${key} to value=${valAsNum}.`)
            this.setState(
                {[key]: valAsNum}, 
                () => {this.props.handleSomeDurationChanged(this.state)}
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.timeLbl}>Work Timer:</Text>
                    <TextInput 
                        style={styles.timeInput} 
                        value={this.state.workMins.toString()} 
                        onChangeText={this.onTextChange('workMins')} 
                        keyboardType='number-pad'/>
                    <Text>mins</Text>
                    <TextInput 
                        style={styles.timeInput} 
                        value={this.state.workSecs.toString()} 
                        onChangeText={this.onTextChange('workSecs')} 
                        keyboardType='number-pad'/>
                    <Text>secs</Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.timeLbl}>Break Timer:</Text>
                    <TextInput 
                        style={styles.timeInput} 
                        value={this.state.breakMins.toString()}
                        onChangeText={this.onTextChange('breakMins')} 
                        keyboardType='number-pad'/>
                    <Text>mins</Text>
                    <TextInput 
                        style={styles.timeInput} 
                        value={this.state.breakSecs.toString()} 
                        onChangeText={this.onTextChange('breakSecs')} 
                        keyboardType='number-pad'/>
                    <Text>secs</Text>
                </View>
            </View>
        )
    }
}