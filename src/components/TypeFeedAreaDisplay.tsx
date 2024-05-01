import React, { useState } from "react";
import ToTypeDisplay from "./ToTypeDisplay";
import TypingArea from "./TypingArea";
import FeedbackDisplay from "./FeedbackDisplay";

const TypeFeedAreaDisplay = () => {

    const [toType, setToType] = useState("Type me!");
    const [typedSoFar, setTypedSoFar] = useState("");
    
    //Need to pass in setToType function into typing area so we can update the display and set to type!
    return (<>
        <ToTypeDisplay toType={toType}></ToTypeDisplay>
        <TypingArea setTypedSoFar={setTypedSoFar} toType={toType}></TypingArea>
        <FeedbackDisplay typedSoFar={typedSoFar} toType={toType}></FeedbackDisplay>
    </>);
}

export default TypeFeedAreaDisplay