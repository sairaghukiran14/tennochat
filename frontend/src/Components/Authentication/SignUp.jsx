import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState();
  const [picLoading, setPicLoading] = useState();
  const toast = useToast();
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please upload Image",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "tonnechat");
      data.append("cloud_name", "dmqz317kh");
      fetch("https://api.cloudinary.com/v1_1/dmqz317kh/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image",
        status: "warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    // console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error.message);
      toast({
        title: "Error Occured!",
        // description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"} color={"black"}>
      <FormControl id="first-name" isRequired>
        <FormLabel>First Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="email_address" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          placeholder="Enter Email Address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.25rem"}>
            <Button
              h={"1.75rem"}
              size={"sm"}
              onClick={(e) => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm_password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width={"4.25rem"}>
            <Button
              h={"1.75rem"}
              size={"sm"}
              onClick={(e) => {
                setShow(!show);
              }}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic" isRequired>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        ></Input>
      </FormControl>
      <Button
        colorScheme="purple"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        SignUp
      </Button>
    </VStack>
  );
};

export default SignUp;
