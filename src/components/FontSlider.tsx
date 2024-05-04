import { Slider, Typography } from "@mui/material"
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
        <Slider
            aria-label="FontSize"
            defaultValue={20}
            valueLabelDisplay="auto"
            min={10}
            max={50}
            onChange={(e, newValue) => onChange(e, newValue)}
        >
            {/* gutterBottom just adds padding to the bottom of Font Size */}
            <Typography id="input-slider" gutterBottom>
                Font Size
            </Typography>
        </Slider>
    </>)
}

export default FontSlider