import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FloatingLabel, Form } from "react-bootstrap";
import { getNewSentence } from '../functions/HelperFunction';

interface Props {
  toType: String,
  typedSoFar: String,
  setTypedSoFar: (String: string) => void;
  setToType: (String: string) => void;
}

var isGettingNewText: Boolean = false;

var keyReleased: Boolean = true; // this is to keep track of wether the user let go of the key or is still holding it down

const TypingArea = ({ setToType, toType, typedSoFar, setTypedSoFar }: Props) => {

  const getNewText = async ():Promise<void> => {
    isGettingNewText = true; // asynchronous function, stop the user from typing while we get new text.
    const newSentence: String = await getNewSentence();
    console.log("New sentence is:",newSentence);
    setToType(newSentence.toString());
    setTypedSoFar("");
    isGettingNewText = false;
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    keyReleased = !e.repeat; // e.repeat returns true if the key is being held down after the initial press where it returns false
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    console.log("key has been upped");
    keyReleased = true; // Indicate that the key has been released
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (!keyReleased) { // If the user presses down a key, then do not allow them to spam letters.
      setTypedSoFar(typedSoFar.toString());
      return;
    }
    if (isGettingNewText) { // Do not allow the user to change or update text when the program is getting new text
      return;
    }
    setTypedSoFar(e.target.value);
    console.log("updated typed text");
    console.log(toType.length, e.target.value.length);
    if (toType.length == e.target.value.length) {
      getNewText();
      setTypedSoFar("");
      console.log("got new text and reset it");
    }
  }

  return (
    <>
      <FloatingLabel
        controlId="floatingTextarea"
        label="Type Here"
        className="mb-3"
      >
        <Form.Control as="textarea"
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          onKeyUp={(e) => onKeyUp(e)}
          value={typedSoFar.toString()} />
      </FloatingLabel>

    </>
  );
}

export default TypingArea