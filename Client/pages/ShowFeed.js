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

const RedditPost = ({ item, key }) => {
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

  // const getRedditData = async () => {
  //   const redditDataRes = await redditService.getRedditData();
  //   console.log(redditDataRes.data.children);

  //   setRedditData(redditData.concat(redditDataRes));
  // };

  // const getTwitterData = async () => {
  //   const twitterDataRes = await twitterService.getTwitterData();
  //   console.log("Twitter data", twitterDataRes.data.data);
  //   setTwitterData(twitterData.concat(twitterDataRes.data));
  //   // console.log("this is the twitterData", twitterData);
  // };

  useEffect(() => {
    const getRedditData = async () => {
      const redditDataRes = await redditService.getRedditData();
      setRedditData(redditData.concat(redditDataRes.data.children));
    };

    const getTwitterData = async () => {
      const twitterDataRes = await twitterService.getTwitterData();
      console.log("Twitter data is", twitterDataRes.data);
      setTwitterData(twitterData.concat(twitterDataRes.data));
    };

    getRedditData();
    getTwitterData();
    setDataFetched(true);
    //
    //
    // setGotData(True)
    // {gotData ? mapshit : null}
  }, []);

  return (
    <>
      <Heading>Cap</Heading>
      {dataFetched &&
        twitterData.map((item, i) => {
          console.log("inside twitter map");
          return <TwitterPost Key={i} item={item} />;
        })}
      {dataFetched &&
        redditData.map((item, i) => {
          console.log("inside reddit map");
          return <RedditPost Key={i} item={item} />;
        })}
    </>
  );

  // if (redditData[0] === undefined && twitterData[0] === undefined) {
  //   return <></>;
  // } else {
  //   console.log("Made it ");
  //   return (
  //     <Center mt="75px">
  //       {twitterData.data.map((item, key) => {
  //         return <RedditPost key={key} item={item} />;
  //       })}
  //     </Center>
  //   );
  // }

  // getRedditData();
  // getTwitterData();
  // if (redditData.length != 0 && twitterData.length != 0) {
  //   return <div> test </div>;
  // }
  // return <div>failed</div>;
}
