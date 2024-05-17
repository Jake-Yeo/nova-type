import { Key, useContext } from "react";
import { TypingData, TypingDataContext } from "../components/TypeFeedAreaDisplay";
import { Box, keyframes, Stack, Typography } from "@mui/material";
import { WavePropsType } from "../components/TwoPeakWaveSvg";
import ShootingStarsAnimation from "../components/ShootingStarsAnimation";

export async function getNewSentence(typingData: TypingData): Promise<string> {

    const characterCount: number = +typingData.wordCount * 5; // 5 is the average amount of characters in every word
    let charactersToReturn: String = "";
    const getArray = []; // an array we will put all the getSentence, getWord, getNumber in, then we will generate a random number to choose a random get if we have more than two setting options picked

    const symbolfy = (toSymbolfy: string) => {

        if (getRandomNumber(3) != 1) { // 1/3 chance to symbolfy
            return toSymbolfy;
        }

        const randomSymbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '~', ',', '<', '>', '.', '?', "/", "\\", ';', ':', '"', "'", '{', '}', '[', ']', '|', '`'];
        const toAppend = randomSymbols[getRandomNumber(randomSymbols.length)];

        const appendSameToBothSides = () => {
            return toAppend + toSymbolfy + toAppend;
        }

        const appendDiffToBothSides = () => {
            const toAppendDiff = randomSymbols[getRandomNumber(randomSymbols.length)];
            return toAppend + toSymbolfy + toAppendDiff;
        }

        const appendLogicalToBothSides = () => {
            const randomLogicalSym1 = ['[', '{', '(', '<'];
            const randomLogicalSym2 = [']', '}', ')', '>'];
            const randomIndex = getRandomNumber(randomLogicalSym1.length);
            return randomLogicalSym1[randomIndex] + toSymbolfy + randomLogicalSym2[randomIndex];
        }

        const appendToRightSide = () => {
            return toSymbolfy + toAppend;
        }

        const appendToLeftSide = () => {
            return toAppend + toSymbolfy;
        }

        const symbolfyProcedures = [];
        symbolfyProcedures.push(appendSameToBothSides);
        symbolfyProcedures.push(appendToRightSide);
        symbolfyProcedures.push(appendToLeftSide);
        symbolfyProcedures.push(appendLogicalToBothSides);
        symbolfyProcedures.push(appendDiffToBothSides);

        toSymbolfy = symbolfyProcedures[getRandomNumber(symbolfyProcedures.length)]();

        return toSymbolfy;
    }

    const getRandomNumber = (arrayLength: number): number => {
        const randomNum = Math.ceil(Math.random() * arrayLength) - 1;
        return randomNum;
    }

    const getASentence = () => {
        return sentenceArray[getRandomNumber(sentenceArray.length)]; // sentences already have a space at the end so don't add it
        // no need to symbolfy since sentences already have symbols
    }

    const getAWord = () => {
        let wordToReturn = words[getRandomNumber(words.length)].trim();
        if (!typingData.lowercaseEnabled && getRandomNumber(4) == 3) { // A 1/4 chance that a word is converted to uppercase
            wordToReturn = wordToReturn.charAt(0).toUpperCase() + wordToReturn.substring(1);
        }
        if (typingData.symbolsEnabled) {
            wordToReturn = symbolfy(wordToReturn);
        }
        return wordToReturn + " "; // we trim the word because there's an invisible character at the end that I don't know of
    }

    const getANumber = () => {
        const lengthOfNumber = getRandomNumber(10) + 1; // + 1 so that length is never zero
        var stringNumToReturn = "";
        for (let i = 0; i < lengthOfNumber; i++) {
            stringNumToReturn += getRandomNumber(10);
        }
        if (typingData.symbolsEnabled) {
            stringNumToReturn = symbolfy(stringNumToReturn);
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

export const getLogo = (fontSize: number) => {

    const fontSizeMain = fontSize + "px";
    const fontSizeSub = (fontSize * (14 / 30)) + "px";
    const fontSizeSpace = (fontSize * (20 / 30)) + "px";
    const widthOfLogo = (fontSize * (100 / 30));
    const heightOfLogo = widthOfLogo * 0.611570247;

    return (
        <Stack direction={'row'} alignItems={'center'}>
            {getSvgBox(widthOfLogo, heightOfLogo, "./svgFiles/novaTypeLogo.svg")}
            <Stack>
                <Stack flexDirection={'row'}>
                    <Typography fontSize={fontSizeSpace}>&nbsp;</Typography>
                    <Typography color="white" fontSize={fontSizeMain} fontWeight={'bold'}>Nova</Typography>
                    <Typography color="#9287B7" fontSize={fontSizeMain} fontWeight={'bold'}>Type</Typography>
                </Stack>
                <Stack flexDirection={'row'}>
                    <Typography fontSize={fontSizeSpace}>&nbsp;</Typography>
                    <Typography color="#635985" fontSize={fontSizeSub} fontWeight={'bold'}>Make a Wish</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}

export const getWaveAnimation = (height: string, opacity: number, direction: string, durationSecs: number, WaveElement: ({ width, height, opacity }: WavePropsType) => JSX.Element) => {

    var moveLeftToRight = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100vw); // Adjust the distance as needed
    }
  `;

    var moveOutToRight = keyframes`
  from {
    transform: translateX(-100vw);
  }
  to {
    transform: translateX(0vw); // Adjust the distance as needed
  }
`;

    if (direction === 'backwards') {
        moveOutToRight = keyframes`
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(0vw); // Adjust the distance as needed
    }
  `;

        moveLeftToRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw); // Adjust the distance as needed
  }
`;
    }

    return (<>
        <Box sx={{
            width: '100vw',
            height: height,
            animation: `${moveLeftToRight} ${durationSecs}s ${direction} linear infinite`,
            position: 'absolute',
            bottom: '0',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
        }}>
            <WaveElement width={'100vw'} height={height} opacity={opacity}></WaveElement>
        </Box>
        <Box sx={{
            width: '100vw',
            height: height,
            animation: `${moveOutToRight} ${durationSecs}s ${direction} linear infinite`,
            position: 'absolute',
            bottom: '0',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
        }}>
            <WaveElement width={'100vw'} height={height} opacity={opacity}></WaveElement>
        </Box></>)
}

export const getSvgBox = (width: number, height: number, path: string) => {
    return (
        <Box
            sx={{
                backgroundImage: `url("${path}")`, // Load background image
                backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                backgroundRepeat: 'no-repeat',
                width: width, // Set the width of the container
                height: height // Automatically adjust the height based on the aspect ratio
            }}
        />
    )
}

export const getToTypeDisplay = (toType: string, typedSoFar: string, setAccuracy: boolean, fontSize: number, typingData: TypingData) => { // only every set accuracy when using this function in this components but not others
    var spanElementOnlyArray: any[] = [];
    var numCorrect: number = 0;
    for (let i = 0; i < toType.length; i++) {
        if (i >= +typedSoFar.length) {
            spanElementOnlyArray.push(getColouredSpan(toType.charAt(i), 'transparent', '#9287B7', i, fontSize))
        } else {
            if (typedSoFar.charAt(i) === toType.charAt(i)) {
                spanElementOnlyArray.push(getColouredSpan(toType.charAt(i), 'transparent', 'white', i, fontSize));
                numCorrect++;
            } else {
                if (toType.charAt(i) == ' ') { // This is just so the user knows that they typed the space wrong
                    spanElementOnlyArray.push(getColouredSpan(typedSoFar.charAt(i), 'transparent', '#FF007A', i, fontSize));
                } else {
                    spanElementOnlyArray.push(getColouredSpan(toType.charAt(i), 'transparent', 'red', i, fontSize));
                }
            }
        }
    }
    //spanElementOnlyArray.push(getColouredSpan(typingData.toType.substring(typingData.typedSoFar.length, typingData.toType.length), 'transparent', '#9287B7', 'myUniqueKey', +typingData.fontSize));

    if (setAccuracy) {
        typingData.setAccuracy(Math.round(numCorrect / typingData.typedSoFar.length * 100)); // Here we are calculating and setting the accuracy
    }

    return (
        <>{spanElementOnlyArray}</>
    );
}

export const getRandomNumber = (minRand: number, maxRand: number): number => {
    const range = maxRand - minRand + 1; // Add 1 to include the upper limit

    return Math.floor(Math.random() * range) + minRand;
};

export const getRandomShootingStar = (): JSX.Element => {

    const topOffset = getRandomNumber(-20, 20);
    const leftOffset = getRandomNumber(-30, 95);
    const randomDuration = getRandomNumber(3, 6);

    const randomXyDistTravelVh = getRandomNumber(40, 80); // might get rid of this (original value: 50)

    const randomHeadWidthPx = getRandomNumber(15, 30);


    return (<ShootingStarsAnimation headWidthPx={randomHeadWidthPx} animationDuratonSecs={randomDuration} xyDistTravelVh={randomXyDistTravelVh} topOffsetVh={topOffset} leftOffsetVw={leftOffset} />);
}
