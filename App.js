// expo, react, react-native, prop-types
import { StyleSheet, Text, View, Button, Pressable, TextInput, Vibration } from 'react-native';
import { useState, useEffect } from 'react';

function FormatNumber(number) {
  if(number < 10) {
    return "0" + number
  }
  return number
}

const Counting = time => {
  const [timer, setTimer] = useState({
    minuts: parseInt(time.value),
    seconds: 0
  })

  useEffect(() => {
    const updateTimer = setInterval(() => {
      if(timer.seconds > 0) {
	setTimer({
          minuts: timer.minuts,
          seconds: timer.seconds - 1
	})
      }
      else {
	setTimer({
          minuts: timer.minuts - 1,
          seconds: 59 
	})
      }
    }, 1000)

    return () => clearInterval(updateTimer)
  })

  if(timer.minuts < 0) {
    Vibration.vibrate()
    return <Text>beat time</Text>
  }
  return <Text>{FormatNumber(timer.minuts)} : {FormatNumber(timer.seconds)}</Text>
}

export default function App() {
  let [counting, setCounting] = useState(false)
  let [focus, setFocus] = useState(true)
  let [focusTime, setFocusTime] = useState(25)
  let [relaxTime, setRelaxTime] = useState(5)

  if(focus) {
    if(!counting) {
      return (
        <View style={styles.timer}>
	  <TextInput
            style={styles.input}
	    value={focusTime}
	    onChangeText={(newTime) => {
              setFocusTime(newTime)
	    }}
	  />
          <Pressable 
	    style={styles.button}
	    onPress={() => {
    	      if(isNaN(parseInt(focusTime))){
		setFocusTime(25)
	      }
	      setCounting(!counting)
            }}
	  >
	    <Text>Start focus</Text>
	  </Pressable>
        </View>
      )
    }
    else {
      return (
        <View style={styles.timer}>
          <Counting value={focusTime}/>
          <Pressable 
	  style={styles.button}
	    onPress={() => {
	      setCounting(!counting)
	      setFocus(!focus)
            }}
	  >
	    <Text>Stop focus</Text>
	  </Pressable>
          <Pressable 
	    style={styles.button}
	    onPress={() => {
	      setCounting(false)
            }} 
	  >
	    <Text>Restart focus</Text>
	  </Pressable>
        </View>
      )
    }
  }
  else {
    if(!counting) {
      return (
        <View style={styles.timer}>
	  <TextInput
	    style={styles.input}
	    value={relaxTime}
	    onChangeText={(newTime) => {
              setRelaxTime(newTime)
	    }}
	  />
          <Pressable 
	    style={styles.button}
	    onPress={() => {
            if(isNaN(parseInt(relaxTime))){
		setRelaxTime(5)
	      }
	      setCounting(!counting)
            }}
	  >
	    <Text>Start relax</Text>
	  </Pressable>
        </View>
      )
    }
    else {
      return (
        <View style={styles.timer}>
          <Counting value={relaxTime}/>
          <Pressable 
	  style={styles.button}
	    onPress={() => {
	      setCounting(!counting)
	      setFocus(!focus)
            }}
	  >
	    <Text>Stop relax</Text>
	  </Pressable>
          <Pressable 
	  style={styles.button}
	    onPress={() => {
	      setCounting(false)
            }}
	  >
	    <Text>Restart relax</Text>
	  </Pressable>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  timer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: 100,
    textAlign: 'center',
  },
  button : {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    marginTop: 10,
    width: 100,
    alignItems: 'center',
  }
});
