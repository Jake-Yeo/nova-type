import { useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";
import { Box, Slider, Typography } from "@mui/material";

const WordCountSlider = () => {
    const typingData = useContext(TypingDataContext);

    const onChange = (e: Event, newValue: number | number[]) => {
        if (typeof newValue == 'number') {
            typingData.setWordCount(newValue);
        }
    }

    return (<>
        <Box sx={{
            padding: '10px',
            paddingLeft: '30px',
            flex: '1',
            display: 'flex',
            alignItems: 'center',
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
                        color: '#635985',
                    }}
                >
                    Word Count:{'\u00A0'}
                </Typography>
                <Typography
                    id="input-slider"
                    sx={{
                        color: '#9287B7'
                    }}
                >
                    {+typingData.wordCount}
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
                defaultValue={35}
                valueLabelDisplay="off"
                min={10}
                max={100}
                step={5}
                onChange={(e, newValue) => onChange(e, newValue)}
            >
            </Slider>
        </Box>
    </>)
}

export default WordCountSlider