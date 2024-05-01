import React, { useEffect, useState } from "react";
import ToTypeDisplay from "./ToTypeDisplay";
import TypingArea from "./TypingArea";
import FeedbackDisplay from "./FeedbackDisplay";
import { getNewSentence } from "../functions/HelperFunction";

const TypeFeedAreaDisplay = () => {

    const [toType, setToType] = useState("");

    useEffect(() => { // This will run once when this component is initialized
        const setInitialSentence = async () => { // must wrap the getNewSentence() in another function because the await keywork must not be used on the function passed into the useEffect() hook.
            const newSentence: String = await getNewSentence(); // Gets a new sentence
            setToType(newSentence.toString());  // Sets the initial sentence
        }
        setInitialSentence(); // call the asynchronous function setInitalSentence
    }, []);

    const [typedSoFar, setTypedSoFar] = useState("");

    
    //Need to pass in setToType function into typing area so we can update the display and set to type!
    return (<>
        <ToTypeDisplay toType={toType}></ToTypeDisplay>
        <TypingArea setTypedSoFar={setTypedSoFar} setToType={setToType} toType={toType} typedSoFar={typedSoFar}></TypingArea>
        <FeedbackDisplay typedSoFar={typedSoFar} toType={toType}></FeedbackDisplay>
    </>);
}

export default TypeFeedAreaDisplay