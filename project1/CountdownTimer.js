import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types'
import vibrate from './utils/vibrate';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    content: {
        fontSize: 50,
    },
    controls: {
        flexDirection: 'row',
    }
});

function formatSecs(duration) {
    if (duration <= 0) {
        return '0s'
    }
    const hrs = Math.floor(duration / 3600)
    duration %= 3600
    const mins = Math.floor(duration / 60)
    const secs = duration % 60
    let formattedStr = `${String(secs).padStart(2,'0')}s`
    formattedStr = mins && `${String(mins).padStart(2,'0')}m ${formattedStr}` || formattedStr
    formattedStr = hrs && `${String(hrs).padStart(2,'0')}h ${formattedStr}` || formattedStr
    return formattedStr
}

export default class CountdownTimer extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        durationInSecs: PropTypes.number.isRequired,
        onFinished: PropTypes.func,
    }

    state = {
        remainingSecs: Math.max(0, this.props.durationInSecs),
        remainingFormatted: formatSecs(Math.max(0, this.props.durationInSecs)),
        countDownPaused: false
    }

    onSecondTick = () => {
        this.setState(prevState => ({
            remainingSecs: prevState.remainingSecs - 1,
            remainingFormatted: formatSecs(prevState.remainingSecs - 1),
        }))
        if (this.state.remainingSecs <= 0) {
            clearInterval(this.countdownInterval)
            vibrate()   // DOES NOT WORK!!!
            if (typeof this.props.onFinished === 'function') {
                this.props.onFinished()
            }
        }
    }

    onResetCountdown = () => {
        clearInterval(this.countdownInterval)
        this.setState({
            remainingSecs: Math.max(0, this.props.durationInSecs),
            remainingFormatted: formatSecs(Math.max(0, this.props.durationInSecs)),
            countDownPaused: true,
        })
    }

    onPauseResumeCountdown = () => {
        this.setState(prevState => {
            if (prevState.countDownPaused) {
                // resume count down.
                this.countdownInterval = setInterval(this.onSecondTick, 1000)
            } else {
                // pause cound down.
                clearInterval(this.countdownInterval)
            }
            return {countDownPaused: !prevState.countDownPaused}
        })
    }

    componentDidMount() {
        this.countdownInterval = setInterval(this.onSecondTick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.countdownInterval)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.content}>{this.props.title}</Text>
                <Text style={styles.content}>{this.state.remainingFormatted}</Text>
                <View style={styles.controls}>
                    <Button title={this.state.countDownPaused ? 'Start' : 'Pause'} onPress={this.onPauseResumeCountdown}/>
                    <Button title='Reset' onPress={this.onResetCountdown}/>
                </View>
            </View>
        )
    }
}