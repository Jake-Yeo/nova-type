import React, { createContext, useEffect, useState } from "react";
import ToTypeDisplay from "./ToTypeDisplay";
import TypingArea from "./TypingArea";
import { getNewSentence, getRandomShootingStar } from "../functions/HelperFunction";
import { Box, Grid } from "@mui/material";
//import "../css/scrollCssTest.css"; // keep so you know how to get paths from the /css folder
import RestartButton from "./RestartButton";
import RealTimeStatDisplay from "./RealTimeStatDisplay";
import SettingsIsland from "./SettingsIsland";
import { currentUser } from "../objects/User";
import { SettingsDataType } from "../objects/Settings";
import { updateOnlineSettings } from "../functions/Backend";

export type TypingData = {
    typedSoFar: String,
    toType: String,
    wpm: Number,
    scrollPaneWidth: Number,
    accuracy: Number,
    duration: Number,
    timersArePaused: Boolean,
    fontSize: Number,
    wordCount: Number,
    numbersEnabled: Boolean,
    wordsEnabled: Boolean,
    sentencesEnabled: Boolean,
    symbolsEnabled: Boolean,
    lowercaseEnabled: Boolean,
    setLowercaseEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    setSymbolsEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    setSentencesEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    setWordsEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    setNumbersEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    setWordCount: React.Dispatch<React.SetStateAction<number>>,
    setFontSize: React.Dispatch<React.SetStateAction<number>>,
    setTimersArePaused: React.Dispatch<React.SetStateAction<boolean>>,
    setDuration: React.Dispatch<React.SetStateAction<number>>,
    setAccuracy: React.Dispatch<React.SetStateAction<number>>,
    setScrollPaneWidth: React.Dispatch<React.SetStateAction<number>>,
    setWpm: React.Dispatch<React.SetStateAction<number>>,
    setToType: React.Dispatch<React.SetStateAction<string>>,
    setTypedSoFar: React.Dispatch<React.SetStateAction<string>>
}

export type StarData = {
    starArray: JSX.Element[],
    setStarArray: React.Dispatch<React.SetStateAction<JSX.Element[]>>
}

export var StarDataContext = createContext<StarData>({
    starArray: [],
    setStarArray: () => { },
})

export var TypingDataContext = createContext<TypingData>({ // initalize
    typedSoFar: '',
    toType: '',
    wpm: 0,
    scrollPaneWidth: 0,
    accuracy: 0,
    duration: 0,
    timersArePaused: true,
    fontSize: 0,
    wordCount: 0,
    numbersEnabled: false,
    wordsEnabled: false,
    sentencesEnabled: true,
    symbolsEnabled: false,
    lowercaseEnabled: false,
    setLowercaseEnabled: () => { },
    setSymbolsEnabled: () => { },
    setSentencesEnabled: () => { },
    setWordsEnabled: () => { },
    setNumbersEnabled: () => { },
    setWordCount: () => { },
    setFontSize: () => { },
    setTimersArePaused: () => { },
    setDuration: () => { },
    setAccuracy: () => { },
    setScrollPaneWidth: () => { },
    setWpm: () => { },
    setToType: () => { },
    setTypedSoFar: () => { }
});

export var refreshTypeFeedAreaDisplay = () => { };


const TypeFeedAreaDisplay = () => {

    // I think this rerun when you go to the typing page, that's why when you set all the data in the User object to the data from the online database, everything changes automatically

    const [toType, setToType] = useState('');
    const [typedSoFar, setTypedSoFar] = useState('');
    const [wpm, setWpm] = useState(0);
    const [scrollPaneWidth, setScrollPaneWidth] = useState(65);
    const [accuracy, setAccuracy] = useState(100);
    const [duration, setDuration] = useState(0);
    const [timersArePaused, setTimersArePaused] = useState(true);
    const [fontSize, setFontSize] = useState(currentUser.getSettings().getFontSize());
    const [wordCount, setWordCount] = useState(currentUser.getSettings().getWordCount());
    const [numbersEnabled, setNumbersEnabled] = useState(currentUser.getSettings().getNumbersEnabled());
    const [wordsEnabled, setWordsEnabled] = useState(currentUser.getSettings().getWordsEnabled());
    const [sentencesEnabled, setSentencesEnabled] = useState(currentUser.getSettings().getSentencesEnabled());
    const [symbolsEnabled, setSymbolsEnabled] = useState(currentUser.getSettings().getSymbolsEnabled());
    const [lowercaseEnabled, setLowercaseEnabled] = useState(currentUser.getSettings().getLowercaseEnabled());

    const typingData: TypingData = {
        typedSoFar,
        toType,
        wpm,
        scrollPaneWidth,
        accuracy,
        duration,
        timersArePaused,
        fontSize,
        wordCount,
        numbersEnabled,
        wordsEnabled,
        sentencesEnabled,
        symbolsEnabled,
        lowercaseEnabled,
        setLowercaseEnabled,
        setSymbolsEnabled,
        setSentencesEnabled,
        setWordsEnabled,
        setNumbersEnabled,
        setWordCount,
        setFontSize,
        setTimersArePaused,
        setDuration,
        setAccuracy,
        setScrollPaneWidth,
        setWpm,
        setToType,
        setTypedSoFar
    }

    refreshTypeFeedAreaDisplay = () => {
        setFontSize(currentUser.getSettings().getFontSize());
        setWordCount(currentUser.getSettings().getWordCount());
        setNumbersEnabled(currentUser.getSettings().getNumbersEnabled());
        setWordsEnabled(currentUser.getSettings().getWordsEnabled());
        setSentencesEnabled(currentUser.getSettings().getSentencesEnabled());
        setSymbolsEnabled(currentUser.getSettings().getSymbolsEnabled());
        setLowercaseEnabled(currentUser.getSettings().getLowercaseEnabled());
    }

    const [starArray, setStarArray] = useState<JSX.Element[]>([]);

    const starData: StarData = {
        starArray,
        setStarArray
    }

    useEffect(() => { // This will run once when this component is initialized
        const setInitialSentence = async () => { // must wrap the getNewSentence() in another function because the await keywork must not be used on the function passed into the useEffect() hook.
            const newSentence: String = await getNewSentence(typingData); // Gets a new sentence
            setToType(newSentence.toString());  // Sets the initial sentence
            TypingDataContext = createContext(typingData);
            StarDataContext = createContext(starData);
        }
        setInitialSentence(); // call the asynchronous function setInitalSentence
    }, []);

    useEffect(() => {

        const newSettings: SettingsDataType  = {
            fontSize: currentUser.getSettings().getFontSize(),
            wordCount: currentUser.getSettings().getWordCount(),
            numbersEnabled: numbersEnabled,
            sentencesEnabled: sentencesEnabled,
            wordsEnabled: wordsEnabled,
            symbolsEnabled: symbolsEnabled,
            lowercaseEnabled: lowercaseEnabled
        }

        currentUser.setSettings(newSettings); // This hook will change the data in the currentUser object when the data changes!

        updateOnlineSettings()
        //.then(() => {console.log("Finished updating online settings!")}); // we put this here because it was running before the currentUser updated in the WordTypesRadioButton

    }, [numbersEnabled, sentencesEnabled, wordsEnabled, symbolsEnabled, lowercaseEnabled])


    /// Star animation code

    const getMeteorShower = () => {
        return (<>
            <Box sx={{
                position: 'fixed',
                width: '100vw', // alter if don't work
                height: '100vh', // alter if don't work
            }}>
                {starArray}
            </Box>
        </>)
    }



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
                <SettingsIsland></SettingsIsland>
                <ToTypeDisplay></ToTypeDisplay>
                {/*TypingArea is purposfully put off the screen*/}
                <StarDataContext.Provider value={starData}>
                    <TypingArea></TypingArea>
                </StarDataContext.Provider>
                <RestartButton></RestartButton>
                <RealTimeStatDisplay></RealTimeStatDisplay>
            </TypingDataContext.Provider>
            <Grid item sx={{
                position: 'absolute',
                bottom: 0,
                width: '100vw',
                height: '100vh',
                margin: 0, // Set margin to 0 to remove any default spacing
                padding: 0, // Set padding to 0 to remove any default padding
                zIndex: -2,
            }}>{getMeteorShower()}</Grid>
        </Grid>

    </>);
}

export default TypeFeedAreaDisplay