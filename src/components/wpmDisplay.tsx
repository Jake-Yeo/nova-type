import { useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

const WpmDisplay = () => {
    const typingData = useContext(TypingDataContext);

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
                        color: '#3BBA00'// the colour will change to red if the wpm is low
                    }}
                >
                    {typingData.wpm.toString()}</span>
            </span>
        </>
    )
}

export default WpmDisplay