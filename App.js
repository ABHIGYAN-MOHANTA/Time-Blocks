import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Vibration,
  TouchableOpacity,
  SafeAreaView,
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
      setTimeLeft(intervalValue * 60); // Reset time left after each vibration interval
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

  const POMODORO_TIME = 25; // 25 minutes for a Pomodoro session
  const SHORT_BREAK_TIME = 5; // 5 minutes for a short break
  let intervalId = null; // Variable to store the interval ID

  const handleButtonPomodoro = () => {
    const newInterval = POMODORO_TIME + SHORT_BREAK_TIME; // Set the new interval (Pomodoro + Short Break)
    setIntervalValue(newInterval);
    setTimeLeft(newInterval * 60);

    const vibratePomodoro = () => {
      Vibration.vibrate();
      setTimeout(
        () => {
          Vibration.vibrate();
        },
        POMODORO_TIME * 60 * 1000
      ); // Vibrate after the Pomodoro session

      setTimeout(
        () => {
          Vibration.vibrate();
        },
        newInterval * 60 * 1000
      ); // Vibrate after the full interval (Pomodoro + Short Break)
    };

    // Start the vibratePomodoro function
    vibratePomodoro();

    // Clear previous intervals before setting a new one
    if (intervalId) {
      clearInterval(intervalId);
    }

    intervalId = setInterval(
      () => {
        handleButtonPomodoro();
      },
      newInterval * 60 * 1000
    );
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Time Blocks inspired by Elon Musk!</Text>
        <Text style={styles.heading}>Choose the interval for a time block</Text>
        <Text style={styles.subHeading}>
          Your phone will vibrate at the end of each interval
        </Text>
        <Text style={styles.intervalText}>{intervalValue} minutes</Text>
        <Text style={styles.timeLeftText}>
          Time left for next vibration: {formatTime(timeLeft)}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.button5]}
            onPress={() => handleButtonPress(5)}
          >
            <Text style={styles.buttonText}>5 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button10]}
            onPress={() => handleButtonPress(10)}
          >
            <Text style={styles.buttonText}>10 min</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.button25]}
            onPress={() => handleButtonPress(25)}
          >
            <Text style={styles.buttonText}>25 min</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPomo]}
            onPress={() => handleButtonPomodoro()}
          >
            <Text style={styles.buttonText}>Pomodoro Tech 25:5</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.note}>
          *Please keep the app on while using. Vibrations may not work in
          certain scenarios.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E122B",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 40,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  intervalText: {
    fontSize: 18,
    marginBottom: 10,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  timeLeftText: {
    fontSize: 16,
    marginBottom: 40,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 40,
  },
  button: {
    flex: 1,
    backgroundColor: "#5E72E4",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 2,
  },
  button5: {
    marginRight: 10,
  },
  button10: {
    marginHorizontal: 10,
  },
  button25: {
    marginLeft: 10,
  },
  buttonPomo: {
    backgroundColor: "#E4725E",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F6F6F6",
    textAlign: "center",
  },
  note: {
    fontSize: 14,
    color: "#F6F6F6",
    textAlign: "center",
    letterSpacing: 1,
  },
});
