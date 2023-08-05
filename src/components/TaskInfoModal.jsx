import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import "../css/taskinfo.css"

const TaskInfoModal = ({ isOpen, onClose, elem }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
            <div className="task_info"><span>Title</span> : <br /> {elem?.title}</div>
            <div className="task_info"><span>Due date</span> : <br /> {elem?.date}</div>
            <div className="task_info"><span>Description</span> : <br /> {elem?.description}</div>
            <div className="task_info"><span>Status</span> : <br /> {elem?.status}</div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskInfoModal;
