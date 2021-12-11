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
  const [errors, setErrors] = useState({});

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setTimeout(() => {
        setErrors({});
      }, 5000);
      return;
    }

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

  const validate = () => {
    if (email === "" && password === "") {
      setErrors({
        ...errors,
        email: "Email is required",
        password: "Password is required",
      });
      return false;
    } else if (email === "" || password === "") {
      if (email === "") {
        setErrors({ ...errors, email: "Email is required" });
      } else {
        setErrors({ ...errors, password: "Password is required" });
      }

      return false;
    } else if (password.length < 4) {
      setErrors({
        ...errors,
        password: "Password must be greater than 3 characters",
      });
      return false;
    }

    return true;
  };
  return (
    <Box height="100vh" bgColor={"muted.800"}>
      <Center mt="75px">
        <Box
          mb="4"
          mt="2"
          bg="purple.400"
          w="90%"
          pt="100px"
          pb="100px"
          rounded="20px"
        >
          <Center>
            <Heading mb="3">
              <Text color="white"> Welcome to Swirl</Text>
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
          setEmail={setEmail}
          handleEmailChange={handleEmailChange}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleFormSubmit={handleFormSubmit}
          handleLoginSubmit={handleLoginSubmit}
          errors={errors}
        />
      </Center>
    </Box>
  );
}

const Form = ({
  showLogin,
  setShowLogin,
  navigation,
  email,
  setEmail,
  handleEmailChange,
  password,
  handlePasswordChange,
  handleFormSubmit,
  handleLoginSubmit,
  errors,
}) => {
  return (
    <VStack space={4} w="90%" mt="3" space={100}>
      <FormControl
        isRequired
        isInvalid={"email" in errors || "password" in errors}
      >
        <FormControl.Label _text={{ color: "purple.400" }}>
          Email
        </FormControl.Label>
        <Input
          fontWeight="bold"
          type="email"
          value={email}
          onChange={handleEmailChange}
          p="4"
          mb={"email" in errors ? 0 : 5}
          bg="gray.200"
          placeholder="swirl@gmail.com"
        />
        {"email" in errors && (
          <FormControl.ErrorMessage
            _text={{
              fontSize: "xs",
              color: "error.500",
              fontWeight: 500,
              marginTop: 0,
            }}
          >
            {errors.email}
          </FormControl.ErrorMessage>
        )}

        <FormControl.Label _text={{ color: "purple.400" }}>
          Password
        </FormControl.Label>
        <Input
          fontWeight="bold"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          p="4"
          bg="gray.200"
          placeholder="**********"
        />
        {"password" in errors && (
          <FormControl.ErrorMessage
            _text={{ fontSize: "xs", color: "red.500", fontWeight: 500 }}
          >
            {errors.password}
          </FormControl.ErrorMessage>
        )}
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
            <Text
              mt="10"
              onPress={() => setShowLogin(!showLogin)}
              color="white"
            >
              Don't have an account? <Text color="purple.400">Sign Up</Text>
            </Text>
          ) : (
            <Text
              mt="10"
              onPress={() => setShowLogin(!showLogin)}
              color="white"
            >
              Have an account? <Text color="purple.400">Sign in</Text>
            </Text>
          )}
        </Center>
      </FormControl>
    </VStack>
  );
};
