import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import SignUp from "../Client/pages/SignUp";
import ShowInformation from "../Client/pages/ShowInformation";
import ShowFeed from "../Client/pages/ShowFeed";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ShowInformation" component={ShowInformation} />
          <Stack.Screen name="ShowFeed" component={ShowFeed} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
