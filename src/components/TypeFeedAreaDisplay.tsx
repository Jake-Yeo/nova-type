import React, { createContext, useEffect, useState } from "react";
import ToTypeDisplay from "./ToTypeDisplay";
import TypingArea from "./TypingArea";
import { getNewSentence } from "../functions/HelperFunction";
import { Grid } from "@mui/material";
//import "../css/scrollCssTest.css"; // keep so you know how to get paths from the /css folder
import RestartButton from "./RestartButton";
import RealTimeStatDisplay from "./RealTimeStatDisplay";

type TypingData = {
    typedSoFar: String,
    toType: String,
    wpm: Number,
    scrollPaneWidth: Number,
    setScrollPaneWidth: React.Dispatch<React.SetStateAction<number>>,
    setWpm: React.Dispatch<React.SetStateAction<number>>,
    setToType: React.Dispatch<React.SetStateAction<string>>,
    setTypedSoFar: React.Dispatch<React.SetStateAction<string>>
}

export var TypingDataContext = createContext<TypingData>({ // initalize
    typedSoFar: '',
    toType: '',
    wpm: 0,
    scrollPaneWidth: 0,
    setScrollPaneWidth: () => {},
    setWpm: () => { },
    setToType: () => { },
    setTypedSoFar: () => { }
});

const TypeFeedAreaDisplay = () => {

    const [toType, setToType] = useState("");

    const [typedSoFar, setTypedSoFar] = useState("");

    const [wpm, setWpm] = useState(0);

    const [scrollPaneWidth, setScrollPaneWidth] = useState(500);

    const typingData: TypingData = {
        typedSoFar: typedSoFar,
        toType: toType,
        wpm: wpm,
        scrollPaneWidth: scrollPaneWidth,
        setScrollPaneWidth: setScrollPaneWidth,
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
        {/*This grid here will hold the typing area, wpm etc, we will arrange the structure in the app.css function i think*/}
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            padding='30px'
        >
            <TypingDataContext.Provider value={typingData}>
                <ToTypeDisplay></ToTypeDisplay>
                {/*TypingArea is purposfully put off the screen*/}
                <TypingArea></TypingArea>
                <RestartButton></RestartButton>
                <RealTimeStatDisplay></RealTimeStatDisplay>
            </TypingDataContext.Provider>
        </Grid>

    </>);
}

export default TypeFeedAreaDisplay