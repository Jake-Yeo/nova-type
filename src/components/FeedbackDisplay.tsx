import { Color, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { TypingDataContext } from "./TypeFeedAreaDisplay";
import { getColouredSpan } from "../functions/HelperFunction";

const FeedbackDisplay = () => {
  const typingData = useContext(TypingDataContext);

  let typedChars: String[] = typingData.typedSoFar.split('');
  const colouredRows: any[] = [];

  for(let i = 0; i < typedChars.length; i++) {

    if (typedChars.length > typingData.toType.length) {
      break;
    }

    if (typedChars[i].charAt(0) === typingData.toType.charAt(i)) {
      colouredRows.push(getColouredSpan(typedChars[i], 'green'));
    } else if (typedChars[i].charAt(0) !== typingData.toType.charAt(i)) {
      colouredRows.push(getColouredSpan(typedChars[i], 'red'));
    } else {
      colouredRows.push(getColouredSpan(typedChars[i], 'white'));
    }
  }

  return (
    <>
      {colouredRows}
    </>
  );
}

export default FeedbackDisplay