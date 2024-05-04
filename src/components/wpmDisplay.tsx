import { useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

const WpmDisplay = () => {
    const typingData = useContext(TypingDataContext);

    const colourUnit = 255/100;
    const greenValue = colourUnit * +typingData.wpm;
    const redValue = 255 - greenValue; // color changes to a redder colour the lower your wpm is

    return (
        <>
            <span>
                <span
                    style={{
                        color: '#635985'
                    }}
                //&nbsp; is a white space that forces react to render a space. For some reason it is not rendering normal spaces like " "
                >WPM:&nbsp;</span>
                <span
                    style={{
                        color: `rgb(${redValue}, ${greenValue}, 0)` // use backticks so you can use variables in the style
                    }}
                >
                    {typingData.wpm.toString()}</span>
            </span>
        </>
    )
}

export default WpmDisplay