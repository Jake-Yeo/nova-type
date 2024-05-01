import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FloatingLabel, Form } from "react-bootstrap";

interface Props {
  toType: String,
  setTypedSoFar: (String: string) => void;
}

const TypingArea = ({ toType, setTypedSoFar }: Props) => {
  const [value, setValue] = useState(toType);

  const onKeyPressed = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTypedSoFar(e.target.value);
  }

  return (
    <>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Type Here"
        className="mb-3"
      >
        <Form.Control as="textarea"
          onChange={(e) => onKeyPressed(e)} />
      </FloatingLabel>

    </>
  );
}

export default TypingArea