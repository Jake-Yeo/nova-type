import { Box, Radio, Typography } from "@mui/material"
import { ReactElement, useContext, useRef } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

interface Props {
    setting: Boolean,
    setSetting: React.Dispatch<React.SetStateAction<boolean>>,
    settingName: String
}

const WordTypesRadioButton = (prop: Props) => {

    const typingData = useContext(TypingDataContext);

    const onClick = () => {

        let optionsSelected = 0; // if options selected is 2 or greater then let the user perform onClick

        if (typingData.wordsEnabled) {
            optionsSelected++;
        }

        if (typingData.numbersEnabled) {
            optionsSelected++;
        }

        if (typingData.symbolsEnabled) {
            optionsSelected++;
        }

        if (typingData.sentencesEnabled) {
            optionsSelected++;
        }

        if (optionsSelected >= 2 || prop.setting == false || prop.setSetting == typingData.setLowercaseEnabled) {
            prop.setSetting(!prop.setting);
        }
    }

    return (<>

        <Box sx={{
            padding: '10px',
            flex: '1',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        }}
        >
            <Typography id="input-slider">
                {prop.settingName}
            </Typography>
            <Radio
                onClick={() => onClick()}
                checked={prop.setting.valueOf()}
                sx={{
                    color: '#635985',
                    '&.Mui-checked': {
                        color: '#635985',
                    },
                }}
            />
        </Box>
    </>)
}

export default WordTypesRadioButton