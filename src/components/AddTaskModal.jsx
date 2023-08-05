import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Textarea } from '@chakra-ui/react'
import instance from "../../axios"
import { useCookies } from "react-cookie";

const AddTaskModal = ({isOpen,onClose}) => {
  
  const toast = useToast()
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const [title,setTitle] = useState("")
  const [date,setDate] = useState("")
  const [description,setDescription] = useState("")
  const [loading,setLoading] = useState(false)

  const handelAdd = async()=>{
    setLoading(true)
    try {
      const task = await instance.post("/api/tasks/new",{
        email : cookies?.user?.email,
        title,date,description
      })
      setLoading(false)
      onClose()

      toast({
        title: 'Task Created Successfully !!!',
        description: "Create more task to stay oraganized",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      window.location.reload()

    } catch (error) {
      setLoading(false)
      toast({
        title: 'Something went wrong !!!',
        description: "Please try after some time",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }

  }


  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
  <FormLabel>Title</FormLabel>
  <Input type='text' mb={2} onChange={(e)=>setTitle(e.target.value)}/>
  <FormLabel>Date</FormLabel>
  <Input type='date' mb={2} onChange={(e)=>setDate(e.target.value)}/>
  <FormLabel>Description</FormLabel>
  <Textarea placeholder='Write description about the task...' resize="none" onChange={(e)=>setDescription(e.target.value)}/>
</FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="orange" mr={3} onClick={handelAdd}>
              Add Task
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
