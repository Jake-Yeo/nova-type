
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form } from "react-bootstrap";

interface Props {
  toType: String;
}

const ToTypeDisplay = ({toType}: Props) => {
  const [value, setValue] = useState(toType);

  return (
    <>
        <Form.Control as="textarea" placeholder="Leave a comment here" value={toType.toString()} disabled/>
    </>
  );
}

export default ToTypeDisplay