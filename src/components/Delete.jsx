import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Button,
    useToast,
  } from '@chakra-ui/react'

import instance from "../../axios"

const Delete = ({id}) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    const handelDelete = async ()=>{
        try {
          const result = await instance.delete("/api/tasks/delete",{
           data : {
            id
           }
          })
          onClose()
          window.location.reload()
        } catch (error) {
          toast({
            title: 'Something went wrong !!!',
            description: "Please try again after some time",
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
        
    }

  return (
    <>
    <Button colorScheme="red" size="xs" onClick={onOpen} >Delete</Button>
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Delete Task</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to Delete this task ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme='red' ml={3} onClick={handelDelete}>
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default Delete