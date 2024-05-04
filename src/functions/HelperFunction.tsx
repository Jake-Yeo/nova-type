import { Key, useContext } from "react";
import { TypingDataContext } from "../components/TypeFeedAreaDisplay";

export async function getNewSentence(): Promise<string> {
    const response = await fetch('/constants/library.txt'); // this gets the response (probably in like a json format)
    let libraryText: String = await response.text(); // Then you need to get the text from the response
    console.log(libraryText);
    const sentenceArray: String[] = libraryText.split("\n");
    const randomIndex: number = Math.ceil(Math.random() * sentenceArray.length) - 1;
    return sentenceArray[randomIndex].trim(); // must trim, im guessing \n character was still on the sentence which changed its length messing with the logic
}

export function getWpm(typedSoFar: String, duration: number) {
    const approxWords = typedSoFar.length / 5;
    const elapsedMins: number = Math.abs(duration / 1000 / 60);

    return Math.round(approxWords / elapsedMins);
}

export function getColouredSpan(char: String, colour: String, backgroundColor: String, keyProp: Key, fontSize: number) {

    return <span key={keyProp} style={{
        color: backgroundColor.toString(),
        backgroundColor: colour.toString(),
        fontSize: fontSize
    }}>{char}</span>;
};
