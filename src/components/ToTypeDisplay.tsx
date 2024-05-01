
import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form } from "react-bootstrap";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

const ToTypeDisplay = () => {
  const typingData = useContext(TypingDataContext);

  return (
    <>
        <Form.Control as="textarea" placeholder="Leave a comment here" value={typingData.toType.toString()} disabled/>
    </>
  );
}

export default ToTypeDisplay