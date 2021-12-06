import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider, Box } from "native-base"; 
import SignUp from "../Client/pages/SignUp";

export default function App() {
  return (
    <NativeBaseProvider>
      <SignUp styles={styles}/>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
