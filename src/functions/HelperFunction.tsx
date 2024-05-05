import { Key, useContext } from "react";
import { TypingDataContext } from "../components/TypeFeedAreaDisplay";

export async function getNewSentence(wordCount: number): Promise<string> {
    const response = await fetch('/constants/library.txt'); // this gets the response (probably in like a json format)
    let libraryText: String = await response.text(); // Then you need to get the text from the response
    console.log(libraryText);
    const sentenceArray: String[] = libraryText.split("\n");

    const getRandomIndex = (): number => {
        return Math.ceil(Math.random() * sentenceArray.length) - 1;
    } 

    let charactersToReturn: String = "";

    const characterCount: number = wordCount * 5; // 5 is the average amount of characters in every word

    while (charactersToReturn.length < characterCount) {
        charactersToReturn += sentenceArray[getRandomIndex()] + "";
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
