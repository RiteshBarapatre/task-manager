import React, { useState } from "react";
import "../css/card.css";
import Delete from "./Delete";
import Complete from "./Complete";
import Edit from "./Edit";
import { useDisclosure } from "@chakra-ui/react";
import TaskInfoModal from "./TaskInfoModal";

const Cardelem = ({ elem }) => {

  const {isOpen,onOpen,onClose} = useDisclosure()
  
  return (
    <>

    <div className="card" key={elem?._id} >
      <div className="card__title" onClick={onOpen}>
        {elem?.title.length > 15
          ? `${elem?.title.substring(0, 20)}...`
          : elem?.title}
      </div>
      <div className="card__options">
        <Delete id={elem?._id} />
        <Edit elem={elem} />
        <Complete id={elem?._id} />
      </div>
      <div className="card__date">Due Date : {elem?.date}</div>
      <div className="card__description">{elem?.description.length > 20
          ? `${elem?.description.substring(0, 35)}...`
          : elem?.description}</div>
    </div>
      <TaskInfoModal isOpen={isOpen} onClose={onClose} elem={elem}/>
    </>
  );
};

export default Cardelem;
