import React, { useContext, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FloatingLabel, Form } from "react-bootstrap";
import { getNewSentence, getRandomShootingStar, getWpm } from '../functions/HelperFunction';
import { StarDataContext, TypingDataContext } from "./TypeFeedAreaDisplay";
import { scrollToTopOfToTypeDisplay } from "./ToTypeDisplay";
import { currentUser } from "../objects/User";
import { TypingStat } from "../objects/TypingStat";
import { updateOnlineTypingStats } from "../functions/Backend";

var isStarAnimationThrottled = false;

var isGettingNewText: Boolean = false;

var keyReleased: Boolean = true; // this is to keep track of wether the user let go of the key or is still holding it down

var userHasTyped = false;

var protocolWhenUserStartsTypingDone = true; // Important to help stop glitch where duration never resets because the user types too fast

var myForm: React.RefObject<HTMLTextAreaElement>;

var startTime = 0;

export function setFocusToTypingArea() {
  myForm.current?.focus(); // ? checks if myForm.current is not null before performing .focus()
}

export function setBlurToTypingArea() {
  myForm.current?.blur(); // ? checks if myForm.current is not null before performing .focus()
}

export var restartPractice = () => { };

const TypingArea = () => {

  const typingData = useContext(TypingDataContext);

  const starData = useContext(StarDataContext);

  myForm = useRef<HTMLTextAreaElement>(null);

  // React.useEffect(() => { // uncomment this if you want it to automatically focus when the app starts
  //    myForm.current?.focus();
  //  console.log("mounted");
  //  }, []); // for some reason, this is running twice, (Turns out it's running twice because of strick mode in index.tsx, it's breaking my program) https://stackoverflow.com/questions/72238175/why-useeffect-running-twice-and-how-to-handle-it-well-in-react
  // Apparently if your program breaks when useEffect runs twice, then there's a bug, so you have to fix it so it works when it runs twice
  // I didn't know how to fix it so I turned off react strict mode

  const getNewText = async (): Promise<void> => {
    isGettingNewText = true; // asynchronous function, stop the user from typing while we get new text.
    const newSentence: String = await getNewSentence(typingData);
    //console.log("New sentence is:", newSentence);
    typingData.setToType(newSentence.toString());
    typingData.setTypedSoFar("");
    typingData.setWpm(0);
    scrollToTopOfToTypeDisplay(); // Set carret position to 0 when you get new text
    userHasTyped = false; // indicate that a new text was generated so the user has not typed yet
    isGettingNewText = false;
  }

  const protocolWhenUserStartsTyping = () => {
    protocolWhenUserStartsTypingDone = false;
    userHasTyped = true; // indicate that if the user types after getting new text that the user did type
    startTime = (new Date()).getTime();
    protocolWhenUserStartsTypingDone = true;
    startAllIntervalFuncs(); // also start all interval functions (ex counter functions that run every second)
  }

  const protocolWhenUserFinishesPrompt = async (typedPrompt: string) => {
    pauseAndResetAllIntervalFuncs();
    await getNewText();
    typingData.setTypedSoFar("");
    currentUser.pushTypingStat(new TypingStat({ wpm: +typingData.wpm, accuracy: +typingData.accuracy, generatedPrompt: typingData.toType.valueOf(), typedPrompt: typedPrompt, duration: +typingData.duration, startTime: startTime, endTime: (new Date()).getTime() }));
    updateOnlineTypingStats().then(() => {
     // console.log("Finished updating online typing stats");
     setFocusToTypingArea(); // refocus so that user can continue typing uninterupted when the new text is gotten
    }); // Then is basically a callback function?
  }

  const pauseAndResetAllIntervalFuncs = () => { // wrapping it in a function so it's easier to understand 
    setBlurToTypingArea(); // prevent user from typing anymore characters in the typing area which messes up the timer and the word count!
    typingData.setTimersArePaused(true);
  }

  const startAllIntervalFuncs = () => { // wrapping it in a function so it's easier to understand 
    typingData.setTimersArePaused(false);
  }

  React.useEffect(() => {
    getNewText();
    currentUser.setSettings({ fontSize: +typingData.fontSize, wordCount: +typingData.wordCount, numbersEnabled: typingData.numbersEnabled.valueOf(), sentencesEnabled: typingData.sentencesEnabled.valueOf(), wordsEnabled: typingData.wordsEnabled.valueOf(), symbolsEnabled: typingData.symbolsEnabled.valueOf(), lowercaseEnabled: typingData.lowercaseEnabled.valueOf() }); // this updates the settings if user changes the settings
  }, [typingData.wordCount, typingData.wordsEnabled, typingData.numbersEnabled, typingData.symbolsEnabled, typingData.lowercaseEnabled, typingData.sentencesEnabled, typingData.fontSize]);

  restartPractice = getNewText; // should probably put this in a effect hook since it runs basically every tick

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (e.key.includes('Arrow') || !protocolWhenUserStartsTypingDone) { // The user can spam the keys extremely fast, so we need to make sure that protocolWhenUserStartsTyping finishes first before they press a key! This prevents a glitch where the duration never resets because the user presses the keys too fast
      e.preventDefault(); // Stops the actions of the arrow keys to stop user from moving the carret!
    }
    keyReleased = !e.repeat; // e.repeat returns true if the key is being held down after the initial press where it returns false
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    //console.log("key has been upped");
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
    //debug();

    if (!keyReleased) { // If the user presses down a key, then do not allow them to spam letters.
      typingData.setTypedSoFar(typingData.typedSoFar.toString());
      return;
    }

    if (isGettingNewText) { // Do not allow the user to change or update text when the program is getting new text
      return;
    }
    if (!userHasTyped) {
      protocolWhenUserStartsTyping();
    }

    typingData.setTypedSoFar(e.target.value);

    // handle star animation here
    if (!isStarAnimationThrottled) {
      starData.setStarArray([...starData.starArray, getRandomShootingStar()]);
      isStarAnimationThrottled = true;
      setTimeout(() => { isStarAnimationThrottled = false; }, 300);
    }

    if (typingData.toType.length <= e.target.value.length) { // this means user has finished typing
      // We pass in e.target.value instead of typingData.typedSoFar because for some reason typingData.typedSoFar is always missing the last character
      protocolWhenUserFinishesPrompt(e.target.value); // what to do when user finishes typing
      //console.log("got new text and reset it");
    }
    //console.log("reached end of statement");
  }

  return (
    <>
      <Form.Control as="textarea"
        ref={myForm}
        style={{
          position: 'fixed',
          left: '200vw',
          top: '200vh'
        }}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        onKeyUp={(e) => onKeyUp(e)}
        //  disregard functions are mainly to stop user from moving their carret
        onMouseMove={(e) => disregardMouseEvent(e)}
        onMouseDown={(e) => onMouseDown(e)}
        onMouseEnter={(e) => disregardMouseEvent(e)}
        onMouseOut={(e) => disregardMouseEvent(e)}
        onMouseUp={(e) => disregardMouseEvent(e)}
        onPaste={(e) => disregardPasteEvent(e)}
        value={typingData.typedSoFar.toString()}
      />
    </>
  );
}

export default TypingArea