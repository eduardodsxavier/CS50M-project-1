// expo, react, react-native, prop-types
import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

const Counting = time => {
  const [timer, setTimer] = useState(time.value)

  useEffect(() => {
    const updateTimer = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)

    return () => clearInterval(updateTimer)
  })


  return <Text>{Math.floor(timer / 60)}:{timer % 60}</Text>
}

export default function App() {
  let [counting, setCounting] = useState(true)
  let [focusTime, setFocusTime] = useState(1500)
  let [relaxTime, setRelaxTime] = useState(300)

  if(counting) {
    return (
      <View style={styles.timer}>
        <Counting value={focusTime}/>
        <Pressable onPress={() => {
	  setCounting(!counting)
        }}>
	  <Text>Stop focus</Text>
	</Pressable>

      </View>
    )
  }
  else {
    return (
      <View style={styles.timer}>
        <Pressable onPress={() => {
	  setCounting(!counting)
        }}>
	  <Text>Start focus</Text>
	</Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  timer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
  }
});
