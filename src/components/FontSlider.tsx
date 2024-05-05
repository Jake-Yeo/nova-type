import { Box, Slider, Typography } from "@mui/material"
import { TypingDataContext } from "./TypeFeedAreaDisplay"
import { useContext } from "react";

const FontSlider = () => {

    const typingData = useContext(TypingDataContext);

    const onChange = (e: Event, newValue: number | number[]) => {
        if (typeof newValue == 'number') {
            typingData.setFontSize(newValue);
            console.log(newValue);
        }
    }

    return (<>
        <Box sx={{
            padding: '10px',
            flex: '1',
            display: 'flex', // Center the content horizontally
            alignItems: 'center', // Center the content vertically
            flexDirection: 'column'
        }}>
            <Typography id="input-slider">
                Font Size
            </Typography>
            <Slider
                aria-label="FontSize"
                defaultValue={35}
                valueLabelDisplay="auto"
                min={10}
                max={50}
                onChange={(e, newValue) => onChange(e, newValue)}
            >
                {/* gutterBottom just adds padding to the bottom of Font Size */}
            </Slider>
        </Box>
    </>)
}

export default FontSlider