import React, { createContext, useEffect, useState } from "react";
import ToTypeDisplay from "./ToTypeDisplay";
import TypingArea from "./TypingArea";
import FeedbackDisplay from "./FeedbackDisplay";
import { getNewSentence } from "../functions/HelperFunction";
import WpmDisplay from "./WpmDisplay";
import { Divider } from "@mui/material";
import TimerDisplay from "./TimerDisplay";
import "../css/scrollCssTest.css";
import { FloatingLabel, Form } from "react-bootstrap";

type TypingData = {
    typedSoFar: String,
    toType: String,
    wpm: Number,
    setWpm: React.Dispatch<React.SetStateAction<number>>,
    setToType: React.Dispatch<React.SetStateAction<string>>,
    setTypedSoFar: React.Dispatch<React.SetStateAction<string>>
}

export var TypingDataContext = createContext<TypingData>({ // initalize
    typedSoFar: '',
    toType: '',
    wpm: 0,
    setWpm: () => { },
    setToType: () => { },
    setTypedSoFar: () => { }
});

const TypeFeedAreaDisplay = () => {

    const [toType, setToType] = useState("");

    const [typedSoFar, setTypedSoFar] = useState("");

    const [wpm, setWpm] = useState(0);

    const typingData: TypingData = {
        typedSoFar: typedSoFar,
        toType: toType,
        wpm: wpm,
        setWpm: setWpm,
        setToType: setToType,
        setTypedSoFar: setTypedSoFar
    }

    useEffect(() => { // This will run once when this component is initialized
        const setInitialSentence = async () => { // must wrap the getNewSentence() in another function because the await keywork must not be used on the function passed into the useEffect() hook.
            const newSentence: String = await getNewSentence(); // Gets a new sentence
            setToType(newSentence.toString());  // Sets the initial sentence
            TypingDataContext = createContext(typingData);
        }
        setInitialSentence(); // call the asynchronous function setInitalSentence
    }, []);

    //Need to pass in setToType function into typing area so we can update the display and set to type!
    // TypingDataContext.Provider passes down all the data from typingData to its child elements using useContext hook!
    return (<>
        <TypingDataContext.Provider value={typingData}>
            <ToTypeDisplay></ToTypeDisplay>
            <TypingArea></TypingArea>
            <FeedbackDisplay></FeedbackDisplay>
            <Divider><WpmDisplay></WpmDisplay></Divider>
            <div className="anyClass" style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                <p>Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there Hello there <span>Bell</span><span>ello there</span> </p>
            </div>
        </TypingDataContext.Provider>
    </>);
}

export default TypeFeedAreaDisplay