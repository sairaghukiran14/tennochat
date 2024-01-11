import React, { useEffect } from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import { useNavigate } from "react-router-dom";
const Homepage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);
  return (
    <Container maxW={"xl"} centerContent className="mt-4">
      <Box className="bg-white px-5 py-2 rounded-xl flex w-full justify-center">
        <Text colorScheme="purple" className=" font-semibold text-xl">
          Tonnechat
        </Text>
      </Box>
      <Box className=" w-full bg-white px-5 py-2 rounded-xl mt-2">
        <Tabs>
          <TabList className="flex justify-around items-center">
            <Tab className="w-[50%]">Login</Tab>
            <Tab className="w-[50%]">SignUp</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
