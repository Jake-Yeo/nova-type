import { Key, useContext } from "react";
import { TypingData, TypingDataContext } from "../components/TypeFeedAreaDisplay";

export async function getNewSentence(typingData: TypingData): Promise<string> {

    const characterCount: number = +typingData.wordCount * 5; // 5 is the average amount of characters in every word
    let charactersToReturn: String = "";
    const getArray = []; // an array we will put all the getSentence, getWord, getNumber in, then we will generate a random number to choose a random get if we have more than two setting options picked


    const getRandomNumber = (arrayLength: number): number => {
        const randomNum = Math.ceil(Math.random() * arrayLength) - 1;
        console.log("rn", randomNum);
        return randomNum;
    }

    const getASentence = () => {
        return sentenceArray[getRandomNumber(sentenceArray.length)]; // sentences already have a space at the end so don't add it
    }

    const getANumber = () => {
        const lengthOfNumber = getRandomNumber(11);
        var stringNumToReturn = "";
        for (let i = 0; i < lengthOfNumber; i++) {
            stringNumToReturn += getRandomNumber(10);
        }
        return stringNumToReturn + " ";
    }

    if (typingData.sentencesEnabled) { // surround in if statement, only get it if the sentence option is picked
        const response = await fetch('/constants/library.txt'); // this gets the response (probably in like a json format)
        var libraryText: String = await response.text(); // Then you need to get the text from the response
        var sentenceArray: String[] = libraryText.split("\n");
        getArray.push(getASentence);
    }

    if (typingData.numbersEnabled) {
        getArray.push(getANumber);
    }

    while (charactersToReturn.length < characterCount) {
        charactersToReturn += getArray[getRandomNumber(getArray.length)]() + "";
    }

    return (charactersToReturn + "").trim(); // must trim, im guessing \n character was still on the sentence which changed its length messing with the logic
}

export function getWpm(typedSoFar: String, duration: number) {
    const approxWords = typedSoFar.length / 5;
    const elapsedMins: number = Math.abs(duration / 1000 / 60);

    return Math.round(approxWords / elapsedMins);
}

export function parseMessyTxtFile(txtFileContents: String) { // This method was converted from the MessyTxtParser.java that you made
    txtFileContents.replaceAll("”", "\"");
    txtFileContents.replaceAll("“", "\"");
    txtFileContents.replaceAll("  ", " ");
    txtFileContents.replaceAll("	", "");
    txtFileContents.replaceAll("?", "?."); // then we can also keep ? as sentences
    txtFileContents.replaceAll("!", "!.");
    txtFileContents = txtFileContents.replace("’", "'");
    txtFileContents.trim();
    const sentences = txtFileContents.split(/(?<!Mrs|mrs|mr|Mr|miss|Ms|ms|Miss|[.]|al|(\(p)|U\.S|U|A|, p)[.](?![.]|(” \()|\"|\d)/); //https://regex101.com/r/mR89S6/1 test your regex function here!
    var fixedSentencesArr: String[] = [];
    for (let sentence in sentences) {
        sentence = sentence.trim();
        sentence = sentence.replaceAll("!.", "!");
        sentence = sentence.replaceAll("?.", "!");
        if (sentence.substring(sentence.length - 1) === "!" || sentence.substring(sentence.length - 1) === "?") {
            fixedSentencesArr.push(sentence + " ");
        } else {
            fixedSentencesArr.push(sentence + ". ");
        }
    }
}

export function getColouredSpan(char: String, colour: String, backgroundColor: String, keyProp: Key, fontSize: number) {

    return <span key={keyProp} style={{
        color: backgroundColor.toString(),
        backgroundColor: colour.toString(),
        fontSize: fontSize
    }}>{char}</span>;
};
