import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Vibration,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import { styles } from "./styles";

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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
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
        <Text style={styles.note}>
          *Please keep the app on while using. Vibrations may not work in
          certain scenarios.
        </Text>
      </View>
    </SafeAreaView>
  );
}
