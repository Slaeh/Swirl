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
  Stack,
  AspectRatio,
  MoreIcon,
  HStack,
  Image,
} from "native-base";

const RedditPost = ({ item }) => {
  let im;
  if (item.data.preview !== undefined) {
    im = item.data.preview.images[0].source.url;
    im = im.replace("amp;s", "s");
    //console.log(im);
  }

  return (
    <Center>
      <Box shadow="2" rounded="lg" w="85%" bgColor={"#FEAF74"} margin={"2"}>
        <Stack space="2" p="4">
          <Flex justify="space-around">
            <Text color="black">{item.data.author}</Text>
            <Text color="black">{item.data.subreddit_name_prefixed}</Text>
          </Flex>
          <Heading
            size={["md", "lg", "md"]}
            fontWeight="medium"
            color={"black"}
          >
            {item.data.title}
          </Heading>
          {/* <Text color="black">
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. It is located in southern India on the Deccan Plateau.The
            city is also known for its parks and nightlife. Bangalore is the
            major center of India's IT industry, popularly known as the Silicon
            Valley of India.
          </Text> */}
          {im !== undefined ? (
            <Center>
              <Image
                source={{
                  uri: im,
                }}
                alt="Reddit image"
                size="2xl"
              ></Image>
            </Center>
          ) : (
            <></>
          )}
        </Stack>
        <Text> UPS: {item.data.ups}</Text>
        <Text> COMMENTS: {item.data.num_comments}</Text>
      </Box>
    </Center>
  );
};

const TwitterPost = ({ item }) => {
  return (
    <Center>
      <Box shadow="2" rounded="lg" w="85%" bgColor={"#78C3F0"} margin={"2"}>
        <Stack space="2" p="4">
          <Text color="black">December 9, 2021</Text>
          <Heading
            size={["md", "lg", "md"]}
            fontWeight="medium"
            color={"black"}
          >
            The Garden City
          </Heading>
          <Text>
            Bengaluru (also called Bangalore) is the center of India's high-tech
            industry. It is located in southern India on the Deccan Plateau.The
            city is also known for its parks and nightlife. Bangalore is the
            major center of India's IT industry, popularly known as the Silicon
            Valley of India.
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};
export default function ShowFeed({ navigation }) {
  const [redditData, setRedditData] = useState([]);
  const [twitterData, setTwitterData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [finalData, setFinalData] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [tweetUsers, setTweetUsers] = useState([]);

  useEffect(() => {
    const getRedditData = async () => {
      const redditDataRes = await redditService.getRedditData();
      console.log("REDDIT DATA", redditDataRes);
      setRedditData(redditData.concat(redditDataRes.data.children));
      setDataFetched(true);
    };

    const getTwitterData = async () => {
      const twitterDataRes = await twitterService.getTwitterData();
      console.log("Twitter data is", twitterDataRes);
      console.log("Tweet users", twitterDataRes.includes.users);
      setTweetUsers(tweetUsers.concat(twitterDataRes.includes.users));
      setTwitterData(twitterData.concat(twitterDataRes.data));
    };

    getRedditData();
    getTwitterData();
  }, []);

  if (dataFetched && isDone == false) {
    setIsDone(true);
    const finalArr = redditData.concat(twitterData);

    for (let i = 0; i < 11; i++) {
      const currentItem = finalArr[i];
      currentItem.type = "Reddit";
    }
    for (let i = 11; i < 22; i++) {
      // console.log(`i = ${i} j = ${i - tweetUsers.length}`);
      const currentItem = finalArr[i];
      currentItem.type = "Twitter";
      // const currentUser = tweetUsers[i - tweetUsers.length].username;
      // console.log(typeof tweetUsers[i - tweetUsers.length].username);
      // currentItem.username = currentUser;
      // currentItem.image = tweetUsers[i - tweetUsers.length].profile_image_url;
    }
    const finalCopy = [...finalArr];
    finalCopy.sort((a, b) => 0.5 - Math.random());

    setFinalData(finalCopy);
  }

  return (
    <>
      <Heading marginLeft={"1.5"} marginBottom={"1.5"}>
        Your Feed
      </Heading>
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
