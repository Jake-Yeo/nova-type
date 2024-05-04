import { Context, Dispatch, SetStateAction, useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";
import React from "react";
import { getWpm } from "../functions/HelperFunction";

const CurrDuratiionDisplay = () => {

    const typingData = useContext(TypingDataContext);

    const timerCount = () => {
        if (!typingData.timersArePaused) {
            const milliPerUpdate = 70; // This means wait 0.5 seconds before updating the duration timer
            setTimeout(() => {
                typingData.setDuration(+typingData.duration + milliPerUpdate); // Probably not good practice to just put this here. But this will 
                typingData.setWpm(getWpm(typingData.typedSoFar, +typingData.duration)); // Probably not good practice to just put this here. But this will update wpm every milliPerUpdate millisecond passes
            }, milliPerUpdate); // So this will increase the duration by milliPerUpdate every milliPerUpdate milliseconds pass
        } else {
            // Timers are only paused when we get a new sentence! That's why we reset the duration counter
            typingData.setDuration(0);
        }
    }

    var [seconds, millis] = ((+typingData.duration / 1000) + "").split(".");
    var mins = "";

    if (!millis) {
        millis = '0'; // Because duration above may not contain a '.' then .split("."), so we must check if millis is undefined and if it is we must give it a value of 0 so it's not null
    }

    const secondsInt: number = parseInt(seconds);

    if (secondsInt >= 60) {
        mins = Math.floor(secondsInt / 60) + "";
        seconds = secondsInt % 60 + "";
    }

    var duration = "";

    if (!(secondsInt >= 60)) {
        duration = seconds.padStart(2, '0') + ':' + millis.padEnd(2, '0');
    } else {
        duration = mins.padStart(2,'0') + ':' + seconds.padStart(2, '0') + ':' + millis.padEnd(2, '0');
    }


    React.useEffect(() => timerCount(), [typingData.duration, typingData.timersArePaused]);

    return (
        <>
            <span>
                <span
                    style={{
                        color: '#635985'
                    }}
                //&nbsp; is a white space that forces react to render a space. For some reason it is not rendering normal spaces like " "
                >Duration:&nbsp;</span>
                <span
                    style={{
                        color: `#B8AAE9` // use backticks so you can use variables in the style
                    }}
                >
                    {duration}</span>
            </span>
        </>
    )
}

export default CurrDuratiionDisplay