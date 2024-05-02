import { useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

const WpmDisplay = () => {
    const typingData = useContext(TypingDataContext);

    return (
        <>
            <span>{typingData.wpm.toString()}</span>
        </>
    )
}

export default WpmDisplay