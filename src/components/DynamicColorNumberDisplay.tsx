import { useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

interface props {
    stat: Number,
    statName: String
    color: String
}

const DynamicColorNumberDisplay = ({ stat, statName, color }: props) => {
    const typingData = useContext(TypingDataContext);

    var colourUnit = 255 / 100;
    var greenValue = colourUnit * +stat;
    var redValue = 255 - greenValue; // color changes to a redder colour the lower your wpm is

    if ((stat + "") === 'NaN') {
        greenValue = 0;
        redValue = 255;  
    } 

    return (
        <>
            <span>
                <span
                    style={{
                        color: `${color}`
                    }}
                //&nbsp; is a white space that forces react to render a space. For some reason it is not rendering normal spaces like " "
                >{statName}&nbsp;</span>
                <span
                    style={{
                        color: `rgb(${redValue}, ${greenValue}, 0)` // use backticks so you can use variables in the style
                    }}
                >
                    {stat.toString()}</span>
            </span>
        </>
    )
}

export default DynamicColorNumberDisplay