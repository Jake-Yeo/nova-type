
import React, { useContext, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { TypingData, TypingDataContext } from "./TypeFeedAreaDisplay";
import { getColouredSpan, getToTypeDisplay } from "../functions/HelperFunction";
import { setFocusToTypingArea } from "./TypingArea";

export var scrollToTopOfToTypeDisplay = () => { };

const ToTypeDisplay = () => {

  const typingData = useContext(TypingDataContext);

  const divRef = useRef<HTMLDivElement>(null);

  const [display, setDisplay] = useState(<></>);

  const setCarretPos = (nthSpan: number, behaviour: String) => {

    const nthChildNodeSpan = divRef.current?.childNodes[nthSpan]; //This here will get the nth span child node in the div element (Important to note that you wrapped every single character in a span, all the spans are wrapped by the div, there are only spans in the div)
    if (nthChildNodeSpan instanceof HTMLElement) { // This basically lets us set the type of nthChildNodeSpan kind of
      // Scroll the span into view
      nthChildNodeSpan.scrollIntoView({
        behavior: behaviour as ScrollBehavior,
        block: 'center'
      }); // here we programatically scroll the div so that the nthChildNodeSpan can be seen by the user
    }
  };

  scrollToTopOfToTypeDisplay = () => { // function to scroll to the top
    if (divRef.current !== null) {
      divRef.current.scrollTop = 0;
    }
  };

  React.useEffect(() => { // This ensures that the display is only updated if fontsize, toType, or typedSoFar are changes, this is so the display does not update every tick which causes the child component to update before the parent component which causes an error
    setDisplay(getToTypeDisplay(typingData.toType.valueOf(), typingData.typedSoFar.valueOf(), true, +typingData.fontSize, typingData)); // we use boolean true so that this function sets the accuracy for us!
    setCarretPos(typingData.typedSoFar.length + 1, 'smooth'); // Put it here because we need to set the Carret everytime the user types, getToTypeDisplay() runs everytime the user types
  }, [typingData.fontSize, typingData.toType, typingData.typedSoFar])

  return (
    <>
      {/** The div below acts as padding since I can't get the padding to work... */}
      <div style={{
        height: '20px'
      }}></div>
      <div className="scrollCss"
        ref={divRef}
        key='scrollPane'
        contentEditable={false}
        style={{
          height: '150px',
          width: `${+typingData.scrollPaneWidth}vw`, // + converts a data type object Number to primitive type number
          overflow: 'hidden',
          whiteSpace: 'normal', // Enable text wrap
          wordWrap: 'break-word', // Allow breaking long words
          overflowY: 'hidden' // Use camelCase for hyphenated CSS properties
        }}
        onMouseUp={() => { setFocusToTypingArea() }}> {/* If this display is clicked, then set focus to the typing area */}
        {display}
      </div>
    </>
  );
}

export default ToTypeDisplay