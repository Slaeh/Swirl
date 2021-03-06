import React, { useState } from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import {
  NativeBaseProvider,
  Box,
  Heading,
  Text,
  Center,
  VStack,
  Button,
  Image,
  Flex,
  Pressable,
} from "native-base";

export default function ShowInformation({ navigation }) {
  const [showLogin, setShowLogin] = useState(false);
  const image = {
    uri: "https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  };

  return (
    // <Flex height="100vh" align="center" direction="column">
    <Box height="100vh" bgColor={"muted.800"}>
      <VStack flex={1}>
        <ImageBackground
          source={image}
          // resizeMode="contain"
          style={styles.image}
        />

        <VStack flex={1} mt="3rem">
          <Center>
            <Heading fontSize="2xl" mt="" mb="3rem" color="purple.500">
              Thanks for joining Swirl! 🍥
            </Heading>
            <Text fontSize="xl" color="white">
              Continue to see your combined timeline.
            </Text>
            <Button
              _text={{ color: "white", fontWeight: "bold" }}
              bg="purple.400"
              borderRadius="15"
              pt="5"
              pb="5"
              mt="8rem"
              onPress={() => navigation.navigate("ShowFeed")}
              w="85%"
            >
              {"Next"}
            </Button>
          </Center>
        </VStack>
      </VStack>
    </Box>
    // </Flex>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "50vh",
    width: "100%",
  },
});
