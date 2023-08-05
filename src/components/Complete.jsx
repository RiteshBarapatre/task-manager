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
import instance from '../../axios'

const Complete = ({id}) => {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


    const handelComplete = async()=>{
      try {
        await instance.put("/api/tasks/status",{
          id
        })
        onClose()
        window.location.reload()
  
        toast({
          title: 'Yay !! Task Completed...',
          description: "Complete more grow more...",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
  
      } catch (error) {
        toast({
          title: 'Something Went Wrong !!!',
          description: "Try after some time",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }

  return (
    <>
    <Button colorScheme="green" size="xs" ml={2} onClick={onOpen}>Completed ?</Button>
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
          Is this task completed ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button colorScheme='red' ml={3} onClick={handelComplete} >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}

export default Complete