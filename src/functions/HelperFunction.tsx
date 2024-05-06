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

    const getAWord = () => {
        let wordToReturn = words[getRandomNumber(words.length)].trim();
        if (!typingData.lowercaseEnabled && getRandomNumber(4) == 3) { // A 1/4 chance that a word is converted to uppercase
            wordToReturn = wordToReturn.charAt(0).toUpperCase() + wordToReturn.substring(1);
        }
        return wordToReturn + " "; // we trim the word because there's an invisible character at the end that I don't know of
    }

    const getANumber = () => {
        const lengthOfNumber = getRandomNumber(10) + 1; // + 1 so that length is never zero
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

    if (typingData.wordsEnabled) { // surround in if statement, only get it if the sentence option is picked
        const response = await fetch('/constants/words.txt'); // this gets the response (probably in like a json format)
        var wordsText: String = await response.text(); // Then you need to get the text from the response
        var words: String[] = wordsText.split("\n");
        getArray.push(getAWord);
    }

    if (typingData.numbersEnabled) {
        getArray.push(getANumber);
    }

    while (charactersToReturn.length < characterCount) {
        charactersToReturn += getArray[getRandomNumber(getArray.length)]() + "";
    }

    if (typingData.lowercaseEnabled) {
        charactersToReturn = charactersToReturn.toLowerCase();
    }

    if (!typingData.symbolsEnabled) {
        charactersToReturn = charactersToReturn.replaceAll(/[^a-zA-Z0-9 ]/g, "");
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
        fontSize: fontSize,
        whiteSpace: "pre-wrap" // This preserves whitespace, for some reason, white space in the spans that were at the end of the line (where the text wraps to the next line) was not being rendered, but this renders it https://stackoverflow.com/questions/74237764/why-react-doesnt-render-whitespaces#:~:text=You%27ll%20be%20able%20to%20display%20only%20whitespace%20by,%7B%20return%20%3Ch1%20style%3D%7B%7B%20whiteSpace%3A%20%22pre-wrap%22%20%7D%7D%3E%7B%22%20%22%7D%3C%2Fh1%3E%3B
    }}>{char}</span>;
};
