import React, { useState, useEffect } from "react";
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
  Divider,
} from "native-base";

const RedditPost = ({ item }) => {
  return (
    <Box border="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          NativeBase
        </Box>
        <Box px="4">
          NativeBase is a free and open source framework that enable developers
          to build high-quality mobile apps using React Native iOS and Android
          apps with a fusion of ES6.
        </Box>
      </VStack>
    </Box>
  );
};

const TwitterPost = ({ item }) => {
  return (
    <Box border="1" borderRadius="md">
      <VStack space="4" divider={<Divider />}>
        <Box px="4" pt="4">
          NativeBase Twitter
        </Box>
        <Box px="4">
          NativeBase is a free and open source framework that enable developers
          to build high-quality mobile apps using React Native iOS and Android
          apps with a fusion of ES6.
        </Box>
      </VStack>
    </Box>
  );
};
export default function ShowFeed({ navigation }) {
  const [redditData, setRedditData] = useState([]);
  const [twitterData, setTwitterData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const getRedditData = async () => {
      const redditDataRes = await redditService.getRedditData();
      setRedditData(redditData.concat(redditDataRes.data.children));
      setDataFetched(true);
    };

    const getTwitterData = async () => {
      const twitterDataRes = await twitterService.getTwitterData();
      console.log("Twitter data is", twitterDataRes.data);
      setTwitterData(twitterData.concat(twitterDataRes.data));
    };

    getRedditData();
    getTwitterData();
  }, []);

  if (dataFetched && isDone == false) {
    setIsDone(true);
    const finalArr = redditData.concat(twitterData);

    for (let i = 0; i < 7; i++) {
      const currentItem = finalArr[i];
      currentItem.type = "Twitter";
    }
    for (let i = 7; i < 32; i++) {
      const currentItem = finalArr[i];
      currentItem.type = "Reddit";
    }
    const finalCopy = [...finalArr];
    finalCopy.sort((a, b) => 0.5 - Math.random());

    setFinalData(finalCopy);
  }

  return (
    <>
      <Heading>Cap</Heading>
      {dataFetched &&
        finalData.map((item, i) => {
          if (item.type === "Reddit") {
            return <RedditPost item={item} key={i} />;
          } else {
            return <TwitterPost item={item} key={i} />;
          }
        })}
    </>
  );
}
