import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  Text,
  Center,
  FormControl,
  Input,
  VStack,
  Button,
  Flex,
} from "native-base";

export default function SignUp() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Center mt="75px">
      <Box
        mb="4"
        mt="2"
        bg="purple.300"
        w="90%"
        pt="100px"
        pb="100px"
        rounded="20px"
      >
        <Center>
          <Heading mb="3">
            Welcome to <Text color="white">Swirl</Text>
          </Heading>
          <Text fontSize="sm" color="white">
            Create an account or sign in
          </Text>
        </Center>
      </Box>
      <Form showLogin={showLogin} setShowLogin={setShowLogin} />
    </Center>
  );
}

const Form = ({ showLogin, setShowLogin }) => {
  return (
    <VStack space={4} w="90%" mt="3" space={100}>
      <FormControl isRequired>
        <FormControl.Label _text={{ color: "gray.400" }}>
          Email
        </FormControl.Label>
        <Input p="4" mb="7" bg="gray.200" placeholder="swirl@gmail.com" />
        <FormControl.Label _text={{ color: "gray.400" }}>
          Password
        </FormControl.Label>
        <Input p="4" bg="gray.200" placeholder="**********" />
        <Button
          _text={{ color: "white" }}
          bg="purple.400"
          borderRadius="15"
          pt="5"
          pb="5"
          mt="10"
        >
          {showLogin ? "Login" : "Create Account"}
        </Button>
        <Center>
          {showLogin ? (
            <Text mt="10" onPress={() => setShowLogin(!showLogin)}>
              Don't have an account? <Text color="purple.400">Sign Up</Text>
            </Text>
          ) : (
            <Text mt="10" onPress={() => setShowLogin(!showLogin)}>
              Have an account? <Text color="purple.400">Sign in</Text>
            </Text>
          )}
        </Center>
      </FormControl>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
