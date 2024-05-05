import { Box, Radio, Typography } from "@mui/material"
import { ReactElement, useRef } from "react";

interface Props {
    setting: Boolean,
    setSetting: React.Dispatch<React.SetStateAction<boolean>>,
    settingName: String
}

const WordTypesRadioButton = (prop: Props) => {

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
                onClick={() => { prop.setSetting(!prop.setting) }}
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