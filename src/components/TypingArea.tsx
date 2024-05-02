import React, { useContext, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FloatingLabel, Form } from "react-bootstrap";
import { getNewSentence, getWpm } from '../functions/HelperFunction';
import { TypingDataContext } from "./TypeFeedAreaDisplay";

var isGettingNewText: Boolean = false;

var keyReleased: Boolean = true; // this is to keep track of wether the user let go of the key or is still holding it down

var userHasTyped = false;

var startTime: Number = 0;

var endTime: Number = 0;

const TypingArea = () => {

  const typingData = useContext(TypingDataContext);

  const myForm = useRef<HTMLTextAreaElement>(null);

  const getNewText = async (): Promise<void> => {
    isGettingNewText = true; // asynchronous function, stop the user from typing while we get new text.
    endTime = (new Date()).getSeconds();// also set the end time when the user finishes typing the sentence and we have to type a new sentence
    const newSentence: String = await getNewSentence();
    console.log("New sentence is:", newSentence);
    typingData.setToType(newSentence.toString());
    typingData.setTypedSoFar("");
    userHasTyped = false; // indicate that a new text was generated so the user has not typed yet
    isGettingNewText = false;
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.key.includes('Arrow')) {
      e.preventDefault(); // Stops the actions of the arrow keys to stop user from moving the carret!
    }
    keyReleased = !e.repeat; // e.repeat returns true if the key is being held down after the initial press where it returns false
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    console.log("key has been upped");
    keyReleased = true; // Indicate that the key has been released
  }

  const disregardMouseEvent = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
  }

  const disregardPasteEvent = (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
  }

  const onMouseDown = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (myForm.current) {
      myForm.current.focus();
    }
    e.preventDefault();
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {

    if (!keyReleased) { // If the user presses down a key, then do not allow them to spam letters.
      typingData.setTypedSoFar(typingData.typedSoFar.toString());
      return;
    }

    if (isGettingNewText) { // Do not allow the user to change or update text when the program is getting new text
      return;
    }
    if (!userHasTyped) {
      userHasTyped = true; // indicate that if the user types after getting new text that the user did type
      startTime = (new Date()).getSeconds();// also set the start time when the user first starts typing.
    }
    typingData.setTypedSoFar(e.target.value);
    typingData.setWpm(getWpm(typingData.typedSoFar, +startTime, +(new Date()).getSeconds())); // update wpm everytime the user types

    if (typingData.toType.length == e.target.value.length) {
      getNewText();
      typingData.setTypedSoFar("");
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
          ref={myForm}
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => onKeyDown(e)}
          onKeyUp={(e) => onKeyUp(e)}
          onMouseMove={(e) => disregardMouseEvent(e)}
          onMouseDown={(e) => onMouseDown(e)}
          onMouseEnter={(e) => disregardMouseEvent(e)}
          onMouseOut={(e) => disregardMouseEvent(e)}
          onMouseUp={(e) => disregardMouseEvent(e)}
          onPaste={(e) => disregardPasteEvent(e)}
          value={typingData.typedSoFar.toString()} />
      </FloatingLabel>
    </>
  );
}

export default TypingArea