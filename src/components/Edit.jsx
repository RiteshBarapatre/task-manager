import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import instance from "../../axios";

const Edit = ({elem}) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title,setTitle] = useState(elem?.title)
  const [date,setDate] = useState(elem?.date)
  const [description,setDescription] = useState(elem?.description)

  const handelEdit = async() => {
    try {
      await instance.put("/api/tasks/edit",{
        id : elem?._id,title,date,description
      }) 
      onClose()
      window.location.reload()

      toast({
        title: 'Task Updated Successfully !!!',
        description: "Be Organized",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

    } catch (error) {
      onClose()
      toast({
        title: 'Something Went Wrong !!!',
        description: "Try after some time",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  };

  return (
    <>
      <Button colorScheme="yellow" ml={2} size="xs" onClick={onOpen}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                mb={2}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                mb={2}
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Write description about the task..."
                resize="none"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="orange" onClick={handelEdit}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Edit;
