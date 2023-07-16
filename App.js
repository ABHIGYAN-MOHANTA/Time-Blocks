import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Vibration,
  TouchableOpacity,
} from "react-native";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

export default function App() {
  const [intervalValue, setIntervalValue] = useState(5); // Default interval is 5 minutes
  const [timeLeft, setTimeLeft] = useState(intervalValue * 60); // Time left in seconds

  useEffect(() => {
    activateKeepAwake(); // Activate keep awake

    const intervalInMilliseconds = intervalValue * 60 * 1000;

    const vibrateMultipleTimes = (times) => {
      if (times === 0) {
        setTimeLeft(intervalValue * 60); // Reset time left after all vibrations
        return;
      }

      Vibration.vibrate();
      setTimeout(() => {
        vibrateMultipleTimes(times - 1);
      }, 500); // Delay between vibrations (adjust as needed)
    };

    const vibrationInterval = setInterval(() => {
      vibrateMultipleTimes(3); // Trigger multiple vibrations
    }, intervalInMilliseconds);

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft === 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => {
      clearInterval(vibrationInterval);
      clearInterval(timer);
      deactivateKeepAwake(); // Deactivate keep awake
    };
  }, [intervalValue]);

  const handleButtonPress = (newInterval) => {
    setIntervalValue(newInterval);
    setTimeLeft(newInterval * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Choose the interval for a time block for your phone to vibrate!
      </Text>
      <Text style={styles.intervalText}>{intervalValue} minutes</Text>
      <Text style={styles.timeLeftText}>
        Time left for next vibration: {formatTime(timeLeft)}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress(0.1)}
        >
          <Text style={styles.buttonText}>0.1 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress(5)}
        >
          <Text style={styles.buttonText}>5 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress(10)}
        >
          <Text style={styles.buttonText}>10 min</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress(25)}
        >
          <Text style={styles.buttonText}>25 min</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>
        After choosing the time interval, put the phone in your pocket to feel
        the vibrations!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 100,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  intervalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  timeLeftText: {
    fontSize: 16,
    marginBottom: 20,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
