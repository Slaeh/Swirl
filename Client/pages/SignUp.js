import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import registerService from "../services/registerUser";
import loginService from "../services/login";
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

export default function SignUp({ navigation }) {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await registerService.registerUser({
      email: email,
      password: password,
    });

    setShowLogin(true);
    setEmail("");
    setPassword("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await loginService.login({
        email: email,
        password: password,
      });

      if (loggedUser) {
        window.sessionStorage.setItem(
          "loggedSwirlUser",
          JSON.stringify(loggedUser)
        );
        setEmail("");
        setPassword("");
        navigation.navigate("ShowInformation");
      }
    } catch (exception) {
      console.log(exception);
    }
  };

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
      <Form
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        navigation={navigation}
        email={email}
        handleEmailChange={handleEmailChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handleFormSubmit={handleFormSubmit}
        handleLoginSubmit={handleLoginSubmit}
      />
    </Center>
  );
}

const Form = ({
  showLogin,
  setShowLogin,
  navigation,
  email,
  handleEmailChange,
  password,
  handlePasswordChange,
  handleFormSubmit,
  handleLoginSubmit,
}) => {
  return (
    <VStack space={4} w="90%" mt="3" space={100}>
      <FormControl isRequired>
        <FormControl.Label _text={{ color: "gray.400" }}>
          Email
        </FormControl.Label>
        <Input
          type="email"
          value={email}
          onChange={handleEmailChange}
          p="4"
          mb="7"
          bg="gray.200"
          placeholder="swirl@gmail.com"
        />
        <FormControl.Label _text={{ color: "gray.400" }}>
          Password
        </FormControl.Label>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          p="4"
          bg="gray.200"
          placeholder="**********"
        />
        <Button
          _text={{ color: "white" }}
          bg="purple.400"
          borderRadius="15"
          pt="5"
          pb="5"
          mt="10"
          type="submit"
          onPress={showLogin ? handleLoginSubmit : handleFormSubmit}
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
