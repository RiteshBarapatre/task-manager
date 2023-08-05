import React, { useEffect, useState } from "react";
import "../css/home.css";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import Cardelem from "./Cardelem";
import AddTaskModal from "./AddTaskModal";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import instance from "../../axios";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    if (cookies?.user?.email) {
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await instance.post("/api/tasks/pending", {
          email: cookies?.user?.email,
        });

        console.log(data);

        setPendingTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);

  return (
    <div className="home">
      <AddTaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Button colorScheme="orange" onClick={onOpen} mt={4}>
        + Add New Task +
      </Button>
      <Box position="relative" my={10}>
        <Divider />
        <AbsoluteCenter bg="orange" px="10" py={2}>
          Pending Tasks
        </AbsoluteCenter>
      </Box>

      {pendingTasks?.length !== 0 ? (
        <div className="pending__tasks">
          <Grid templateColumns="repeat(4,1fr)" gap={6} ml={5}>
            {pendingTasks.map((elem) => {
              return <Cardelem elem={elem} />;
            })}
          </Grid>
        </div>
      ) : (
        <div style={{ textAlign: "center", fontSize: "30px" }}>
          Nothing to Show, Please Add task 
        </div>
      )}
    </div>
  );
};

export default Home;
