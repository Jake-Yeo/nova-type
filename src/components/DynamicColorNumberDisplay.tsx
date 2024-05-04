import { useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

interface props {
    stat: Number,
    statName: String
}

const DynamicColorNumberDisplay = ({ stat, statName }: props) => {
    const typingData = useContext(TypingDataContext);

    const colourUnit = 255 / 100;
    const greenValue = colourUnit * +stat;
    const redValue = 255 - greenValue; // color changes to a redder colour the lower your wpm is

    return (
        <>
            <span>
                <span
                    style={{
                        color: '#635985'
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