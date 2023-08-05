import { AbsoluteCenter, Box, Center, Divider, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Cardelem from "./Cardelem";
import instance from "../../axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const CompletedTask = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    if (cookies?.user?.email) {
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await instance.post("/api/tasks/completed", {
          email: cookies?.user?.email,
        });

        console.log(data);

        setCompletedTasks(data);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);

  return (
    <>
      <Box position="relative" my={10}>
        <Divider />
        <AbsoluteCenter bgColor="green" px="10" py={2}>
          Completed Task
        </AbsoluteCenter>
      </Box>
      {completedTasks.length !== 0 ?
      <div style={{ display: "flex" }}>
          <Grid templateColumns="repeat(4,1fr)" gap={6} ml={5}>
            {completedTasks.map((elem) => {
              return <Cardelem elem={elem} />;
            })}
          </Grid>
      </div>
         : (
          <div style={{textAlign : "center",fontSize : "30px"}}>Nothing to Show</div>
        )}
    </>
  );
};

export default CompletedTask;
