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
            flex: '1'
        }}>
            <Typography id="input-slider">
                Word Count
            </Typography>
            <Slider
                aria-label="FontSize"
                defaultValue={35}
                valueLabelDisplay="auto"
                min={10}
                max={100}
                step={5}
                marks
                onChange={(e, newValue) => onChange(e, newValue)}
            >
                {/* gutterBottom just adds padding to the bottom of Font Size */}
            </Slider>
        </Box>
    </>)
}

export default WordCountSlider