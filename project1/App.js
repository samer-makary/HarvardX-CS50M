import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CountdownDurationInput from './CountdownDurationInput';
import CountdownTimer from './CountdownTimer';

export default class App extends React.Component {
  state = {
    durations: {
        workMins: 25,
        workSecs: 0,
        breakMins: 5,
        breakSecs: 0,
    },
    durationHasChanged: false,
    isWorking: true,
    timerDurationInSecs: 25 * 60,
  }

  updateTimerDurations = (newDurations) => {
    console.log(`Durations updated to: ${JSON.stringify(newDurations)}.`)
    this.setState({
      durations: {...newDurations},
      durationHasChanged: true,
    })
  }

  switchTimers = () => {
    const durs = this.state.durations
    const nextDurInSecs = (this.state.isWorking 
      ? durs.breakMins * 60 + durs.breakSecs
      : durs.workMins * 60 + durs.workSecs)
      this.setState({
        durationHasChanged: true,
        isWorking: !this.state.isWorking,
        timerDurationInSecs: nextDurInSecs,
      })
  }

  componentDidUpdate() {
    console.log('App.componentDidUpdate')
    if (this.state.durationHasChanged) {
      const durs = this.state.durations
      const durInSecs = (this.state.isWorking 
        ? durs.workMins * 60 + durs.workSecs 
        : durs.breakMins * 60 + durs.breakSecs)
      this.setState({
        durationHasChanged: false,
        timerDurationInSecs: durInSecs,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {(!this.state.durationHasChanged 
          && <CountdownTimer
            title={this.state.isWorking ? 'WORK TIMER' : 'BREAK TIMER'} 
            durationInSecs={this.state.timerDurationInSecs} 
            onFinished={this.switchTimers}/>)}
        <CountdownDurationInput 
          defaultDurations={{...this.state.durations}} 
          handleSomeDurationChanged={this.updateTimerDurations} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
