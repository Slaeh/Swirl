import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  Text,
  Center,
  VStack,
  Button,
} from "native-base";

export default function ShowInformation({ navigation }) {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Center mt="75px" flex={1}>
      <Center>
        <Heading fontSize="lg" mb="3">
          Thanks for joining Swirl! 🍥
        </Heading>
        <Text fontSize="md">Continue to see your combined timeline.</Text>
      </Center>

      <Form
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        navigation={navigation}
      />
    </Center>
  );
}

const Form = ({ showLogin, setShowLogin, navigation }) => {
  return (
    <VStack space={4} w="90%" mt="3" space={100}>
      <Button
        _text={{ color: "white" }}
        bg="purple.400"
        borderRadius="15"
        pt="5"
        pb="5"
        mt="10"
        onPress={() => navigation.navigate("ShowFeed")}
      >
        {"Next"}
      </Button>
    </VStack>
  );
};
