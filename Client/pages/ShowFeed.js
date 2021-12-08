import React, { useState } from "react";
import twitterService from "../services/twitter";
import redditService from "../services/reddit";

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

export default function ShowFeed({ navigation }) {
  const [redditData, setRedditData] = useState([]);
  const [twitterData, setTwitterData] = useState([]);

  const getRedditData = async () => {
    const redditDataRes = await redditService.getRedditData();
    console.log(redditDataRes);
    setRedditData(redditData.concat(redditDataRes));
  };

  const getTwitterData = async () => {
    const twitterDataRes = await twitterService.getTwitterData();
    console.log(twitterDataRes);
    setTwitterData(twitterData.concat(twitterDataRes));
  };

  return (
    <Center mt="75px">
      <Form
        navigation={navigation}
        getRedditData={getRedditData}
        getTwitterData={getTwitterData}
      />
    </Center>
  );
}

const Form = ({
  showLogin,
  setShowLogin,
  navigation,
  getRedditData,
  getTwitterData,
}) => {
  return (
    <VStack space={4} w="90%" mt="3" space={100}>
      <Text>Showing Feed</Text>
      <Button
        _text={{ color: "white" }}
        bg="purple.400"
        borderRadius="15"
        pt="5"
        pb="5"
        mt="10"
        onPress={getRedditData}
      >
        CLICK ME FOR REDDIT DATA
      </Button>
      <Button
        _text={{ color: "white" }}
        bg="purple.400"
        borderRadius="15"
        pt="5"
        pb="5"
        mt="10"
        onPress={getTwitterData}
      >
        CLICK ME FOR TWITTER DATA
      </Button>
      <Button
        _text={{ color: "white" }}
        bg="purple.400"
        borderRadius="15"
        pt="5"
        pb="5"
        mt="10"
        onPress={() => navigation.navigate("SignUp")}
      >
        Go back to first page!
      </Button>
    </VStack>
  );
};
