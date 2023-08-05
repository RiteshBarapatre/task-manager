import React, { useState } from "react";
import "../css/login.css";
import { Button, Input, theme, useDisclosure, useToast } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import instance from "../../axios"
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const toast = useToast()

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0)

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [cpassword,setCpassword] = useState("")
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  const handelSignUp = async ()=>{

    if(password === cpassword){
      setLoading(true)
    try {
      const {data} = await instance.post("/api/user/signup",{
        name,email,password
      })
      console.log(data)

      setCookie('user', data, { path: '/'});
      
      
      setLoading(false)

      navigate("/")

      toast({
        title: 'Account created successfully !!!',
        description: "Manage your task as you want",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Email already exist',
        description: "Please try with different email",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
    }
    }
    else{
      toast({
        title: 'Password not matching !!!',
        description: "Please recheck the password",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }


  const handelLogin = async ()=>{
    setLoading(true)
    try {
      const {data} = await instance.post("/api/user/login",{
        email,password
      })

      setCookie('user', data, { path: '/' });
      
      setLoading(false)

      navigate("/")

      toast({
        title: 'Welcome back !!!',
        description: "Manage your task as you want",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Something went wrong !!!',
        description: "Please try again after some time",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <div className="text">
        Welcome to <span>TASK MANAGER</span> <br />
        We care for your privacy more than any thing else... <br />
        Please Login for maintaining your tasks !!! <br />
        <Button
          colorScheme="orange"
          className="login__loginBtn"
          onClick={onOpen}
        >
          Login
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{tabIndex===1 ? "Signup" : "Login"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Tabs onChange={(index) => setTabIndex(index)}>
                <TabList>
                  <Tab>Login</Tab>
                  <Tab>Signup</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                  <FormControl>
  <FormLabel>Email address</FormLabel>
  <Input type='email' onChange={(e)=>setEmail(e.target.value)}/>
  <FormHelperText mb={4}>We'll never share your email.</FormHelperText>
  <FormLabel>Password</FormLabel>
  <Input type='password' onChange={(e)=>setPassword(e.target.value)}/>
</FormControl>
                  </TabPanel>
                  <TabPanel>
                  <FormControl>
  <FormLabel>Name</FormLabel>
  <Input type='text' mb={2} onChange={(e)=>setName(e.target.value)}/>
  <FormLabel>Email address</FormLabel>
  <Input type='email' mb={2} onChange={(e)=>setEmail(e.target.value)}/>
  <FormHelperText mb={4}>We'll never share your email.</FormHelperText>
  <FormLabel>Password</FormLabel>
  <Input type='password' mb={2} onChange={(e)=>setPassword(e.target.value)}/>
  <FormLabel>Confirm Password</FormLabel>
  <Input type='text' mb={2} onChange={(e)=>setCpassword(e.target.value)}/>
</FormControl>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button isLoading={loading} colorScheme="orange" mr={3} onClick={tabIndex === 1 ? handelSignUp : handelLogin}>
                {tabIndex === 1 ? "SignUp" : "Login"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Login;
