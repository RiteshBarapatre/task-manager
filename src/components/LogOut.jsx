import { Button } from "@chakra-ui/react";
import React from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
  } from '@chakra-ui/react'

import instance from "../../axios"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LogOut = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const cancelRef = React.useRef()
    

    const handelLogOut = ()=>{
      onClose()
        removeCookie("user")
        navigate("/login")
    }

  return (
    <>
      <Button position="absolute" right={5} colorScheme="red" onClick={onOpen}>
        Log Out
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Log Out</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to Log Out ?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={handelLogOut}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LogOut;
