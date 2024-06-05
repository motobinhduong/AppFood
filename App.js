import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "../AppFood/src/navigation/index";
import * as firebase from '@react-native-firebase/app';



export default function App() {
  return (
    <AppNavigation />
  );
}

;