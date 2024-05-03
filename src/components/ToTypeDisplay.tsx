
import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { TypingDataContext } from "./TypeFeedAreaDisplay";
import { getColouredSpan } from "../functions/HelperFunction";
import { setFocusToTypingArea } from "./TypingArea";

const ToTypeDisplay = () => {

  const typingData = useContext(TypingDataContext);

  var spanElementOnlyArray: any[] = [];

  const getToTypeDisplay = () => {

    for (let i = 0; i < typingData.typedSoFar.length; i++) {
      if (typingData.typedSoFar.charAt(i) === typingData.toType.charAt(i)) {
        spanElementOnlyArray.push(getColouredSpan(typingData.toType.charAt(i), 'transparent', 'green', i));
      } else {
        spanElementOnlyArray.push(getColouredSpan(typingData.toType.charAt(i), 'transparent', 'red', i));
      }
    }
    spanElementOnlyArray.push(getColouredSpan(typingData.toType.substring(typingData.typedSoFar.length, typingData.toType.length), 'transparent', 'white', 'myUniqueKey'));

    return (
      <>{spanElementOnlyArray}</>
    );
  }

  return (
    <>
      <div className="scrollCss"
        key='scrollPane'
        onMouseUp={() => {setFocusToTypingArea()}}> {/* If this display is clicked, then set focus to the typing area */}
        {getToTypeDisplay()}
      </div>
    </>
  );
}

export default ToTypeDisplay