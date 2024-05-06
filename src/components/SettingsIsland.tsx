import { Grid, Paper } from "@mui/material"
import FontSlider from "./FontSlider"
import WordCountSlider from "./WordCountSlider"
import WordTypesRadioButton from "./WordTypesRadioButton"
import { TypingDataContext } from "./TypeFeedAreaDisplay"
import { useContext } from "react"

const SettingsIsland = () => {

    const typingData = useContext(TypingDataContext);

    return (
        <>
            <Paper
                variant="elevation"
                elevation={3}
                square={false}
                sx={{
                    borderRadius: '20px',
                    height: 'fit-content', // don't actually know if this works
                    display: 'inline-block',
                    width: '75vw',
                    backgroundColor: '#292140'
                }}>
                <span style={{
                    color: '#635985',
                }}>
                    <Grid container
                        direction='row'
                        justifyContent='space-evenly'
                    >
                        <FontSlider></FontSlider>
                        <WordCountSlider></WordCountSlider>
                        <WordTypesRadioButton setting={typingData.numbersEnabled} setSetting={typingData.setNumbersEnabled} settingName={"Numbers"}></WordTypesRadioButton>
                        <WordTypesRadioButton setting={typingData.sentencesEnabled} setSetting={typingData.setSentencesEnabled} settingName={"Sentences"}></WordTypesRadioButton>
                        <WordTypesRadioButton setting={typingData.wordsEnabled} setSetting={typingData.setWordsEnabled} settingName={"Words"}></WordTypesRadioButton>
                        <WordTypesRadioButton setting={typingData.symbolsEnabled} setSetting={typingData.setSymbolsEnabled} settingName={"Symbols"}></WordTypesRadioButton>
                        <WordTypesRadioButton setting={typingData.lowercaseEnabled} setSetting={typingData.setLowercaseEnabled} settingName={"Lowercase"}></WordTypesRadioButton>
                    </Grid>
                </span>
            </Paper>
        </>
    )
}

export default SettingsIsland