export async function getNewSentence(): Promise<string> {
    const response = await fetch('/constants/library.txt'); // this gets the response (probably in like a json format)
    let libraryText: String = await response.text(); // Then you need to get the text from the response
    console.log(libraryText);
    const sentenceArray: String[] = libraryText.split("\n");
    const randomIndex: number =  Math.ceil(Math.random() * sentenceArray.length) - 1;
    return sentenceArray[randomIndex].trim(); // must trim, im guessing \n character was still on the sentence which changed its length messing with the logic
}

