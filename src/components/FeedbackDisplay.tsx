import { Color, Typography } from "@mui/material";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
  typedSoFar: String,
  toType: String
}

const FeedbackDisplay = ({ typedSoFar, toType }: Props) => {

  let typedChars: String[] = typedSoFar.split('');
  const colouredRows: any[] = [];

  const getColouredSpan = (char: String, colour: String) => {
    return <span style={{ color: colour.toString() }}>{char}</span>;
  };

  for(let i = 0; i < typedChars.length; i++) {

    if (typedChars.length > toType.length) {
      break;
    }

    if (typedChars[i].charAt(0) === toType.charAt(i)) {
      colouredRows.push(getColouredSpan(typedChars[i], 'green'));
    } else if (typedChars[i].charAt(0) !== toType.charAt(i)) {
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