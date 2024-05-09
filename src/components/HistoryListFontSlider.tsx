import { Box, Slider, Typography } from "@mui/material";
import { currentUser } from "../objects/User";
import { TypingDataContext } from "./TypeFeedAreaDisplay";
import { Dispatch, SetStateAction, useContext, useState } from "react";

interface Props {
    setFontSize: React.Dispatch<React.SetStateAction<number>>
}

const HistoryListFontSlider = ({setFontSize}: Props) => {

    const [fontSizeDisplay, setFontSizeDisplay] = useState(currentUser.getHistorySettings().getFontSize());


    const onChange = (e: Event, newValue: number | number[]) => {
        if (typeof newValue == 'number') {
            setFontSize(newValue);
            currentUser.getHistorySettings().setFontSize(newValue);
            setFontSizeDisplay(newValue);
            console.log(currentUser.getHistorySettings().getFontSize());
        }
    }

    return (<>
        <Box sx={{
            padding: '10px',
            paddingLeft: '20px',
            flex: '1',
            display: 'flex', // Center the content horizontally
            alignItems: 'center', // Center the content vertically
            flexDirection: 'column'
        }}>
            <Box sx={{
                flexDirection: 'row',
                flex: '1',
                display: 'flex', // Center the content horizontally
                alignItems: 'center', // Center the content vertically
            }}>
                <Typography
                    id="input-slider"
                    sx={{
                        color: '#635985'
                    }}
                >
                    Font Size:{'\u00A0'}
                </Typography>
                <Typography
                    id="input-slider"
                    sx={{
                        color: '#9287B7'
                    }}
                >
                    {+fontSizeDisplay}
                </Typography>
            </Box>
            <Slider
                sx={{
                    color: '#9287B7',
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#9287B7',
                        width: '15px',
                        height: '15px',
                        '&:hover': {
                            boxShadow: '0px 0px 0px 8px rgba(146, 135, 183, 0.5)', // Change the color and properties of the box shadow here
                        },
                        '&:not(:hover)': {
                            boxShadow: '0px 0px 0px 0px rgba(146, 135, 183, 0.5)'
                        },
                        '&:active': {
                            boxShadow: '0px 0px 0px 12px rgba(146, 135, 183, 0.5)'
                        },
                    },
                }}
                aria-label="FontSize"
                value={currentUser.getHistorySettings().getFontSize()}
                valueLabelDisplay="off"
                min={10}
                max={50}
                onChange={(e, newValue) => onChange(e, newValue)}
            >
                {/* gutterBottom just adds padding to the bottom of Font Size */}
            </Slider>
        </Box>
    </>)
}

export default HistoryListFontSlider