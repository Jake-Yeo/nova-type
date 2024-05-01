import React, { createContext, useEffect, useState } from "react";
import ToTypeDisplay from "./ToTypeDisplay";
import TypingArea from "./TypingArea";
import FeedbackDisplay from "./FeedbackDisplay";
import { getNewSentence } from "../functions/HelperFunction";

type TypingData = {
    typedSoFar: String,
    toType: String,
    elapsedTime: Number,
    totalTime: Number,
    setToType: React.Dispatch<React.SetStateAction<string>>,
    setTypedSoFar: React.Dispatch<React.SetStateAction<string>>
}

export var TypingDataContext = createContext<TypingData>({ // initalize
    typedSoFar: '',
    toType: '',
    elapsedTime: 0,
    totalTime: 0,
    setToType: () => {},
    setTypedSoFar: () => {}
});

const TypeFeedAreaDisplay = () => {

    const [toType, setToType] = useState("");

    const [typedSoFar, setTypedSoFar] = useState("");

    const typingData: TypingData = {
        typedSoFar: typedSoFar,
        toType: toType,
        elapsedTime: 0,
        totalTime: 0,
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
    // TypingDataContext.Provider passes down all the data from typingData using useContext hook!
    return (<>
        <TypingDataContext.Provider value={typingData}> 
            <ToTypeDisplay></ToTypeDisplay>
            <TypingArea></TypingArea>
            <FeedbackDisplay></FeedbackDisplay>
        </TypingDataContext.Provider>
    </>);
}

export default TypeFeedAreaDisplay