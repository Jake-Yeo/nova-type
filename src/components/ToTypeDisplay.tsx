
import React, { useContext, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { TypingDataContext } from "./TypeFeedAreaDisplay";
import { getColouredSpan } from "../functions/HelperFunction";
import { setFocusToTypingArea } from "./TypingArea";

const ToTypeDisplay = () => {

  const typingData = useContext(TypingDataContext);

  const divRef = useRef<HTMLDivElement>(null);

  const setCarretPos = (nthSpan: number) => {

    const nthChildNodeSpan = divRef.current?.childNodes[nthSpan]; //This here will get the nth span child node in the div element (Important to note that you wrapped every single character in a span, all the spans are wrapped by the div, there are only spans in the div)
    if (nthChildNodeSpan instanceof HTMLElement) { // This basically lets us set the type of nthChildNodeSpan kind of
      // Scroll the span into view
      nthChildNodeSpan.scrollIntoView({ behavior: 'smooth' }); // here we programatically scroll the div so that the nthChildNodeSpan can be seen by the user
    }
  };

  var spanElementOnlyArray: any[] = [];

  const getToTypeDisplay = () => {
    for (let i = 0; i < typingData.typedSoFar.length; i++) {
      if (typingData.typedSoFar.charAt(i) === typingData.toType.charAt(i)) {
        spanElementOnlyArray.push(getColouredSpan(typingData.toType.charAt(i), 'transparent', 'white', i));
      } else {
        spanElementOnlyArray.push(getColouredSpan(typingData.toType.charAt(i), 'transparent', 'red', i));
      }
    }
    spanElementOnlyArray.push(getColouredSpan(typingData.toType.substring(typingData.typedSoFar.length, typingData.toType.length), 'transparent', '#9287B7', 'myUniqueKey'));

    setCarretPos(typingData.typedSoFar.length);

    return (
      <>{spanElementOnlyArray}</>
    );
  }

  return (
    <>
      <div className="scrollCss"
        ref={divRef}
        key='scrollPane'
        contentEditable={false}
        style={{
          height: '150px',
          width: +typingData.scrollPaneWidth, // + converts a data type object Number to primitive type number
          overflow: 'hidden',
          overflowY: 'hidden' // Use camelCase for hyphenated CSS properties
        }}
        onMouseUp={() => { setFocusToTypingArea() }}> {/* If this display is clicked, then set focus to the typing area */}
        {getToTypeDisplay()}
      </div>
    </>
  );
}

export default ToTypeDisplay