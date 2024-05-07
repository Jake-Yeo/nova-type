export type SettingsType = {
    fontSize: number;
    wordCount: number;
    numbersEnabled: boolean;
    sentencesEnabled: boolean;
    wordsEnabled: boolean;
    symbolsEnabled: boolean;
    lowercaseEnabled: boolean;
}

export class Settings {
    private _fontSize: number;
    private _wordCount: number;
    private _numbersEnabled: boolean;
    private _sentencesEnabled: boolean;
    private _wordsEnabled: boolean;
    private _symbolsEnabled: boolean;
    private _lowercaseEnabled: boolean;

    constructor() {
        this._fontSize = 35;
        this._wordCount = 25;
        this._numbersEnabled = false;
        this._sentencesEnabled = false;
        this._wordsEnabled = true;
        this._symbolsEnabled = false;
        this._lowercaseEnabled = false;

    }

    public setSettings({fontSize, wordCount, numbersEnabled, sentencesEnabled, wordsEnabled, symbolsEnabled, lowercaseEnabled}: SettingsType) {
        this._fontSize = fontSize;
        this._wordCount = wordCount;
        this._numbersEnabled = numbersEnabled;
        this._sentencesEnabled = sentencesEnabled;
        this._wordsEnabled = wordsEnabled;
        this._symbolsEnabled = symbolsEnabled;
        this._lowercaseEnabled = lowercaseEnabled;
    }

    // get methods

    public getFontSize(): number {
        return this._fontSize;
    }

    public getWordCount(): number {
        return this._wordCount;
    }

    public getNumbersEnabled(): boolean {
        return this._numbersEnabled;
    }

    public getSentencesEnabled(): boolean {
        return this._sentencesEnabled;
    }

    public getWordsEnabled(): boolean {
        return this._wordsEnabled;
    }

    public getSymbolsEnabled(): boolean {
        return this._symbolsEnabled;
    }

    public getLowercaseEnabled(): boolean {
        return this._lowercaseEnabled;
    }

    // set methods

    public setFontSize(fontSize: number) {
        this._fontSize = fontSize;
    }

    public setWordCount(wordCount: number) {
        this._wordCount = wordCount;
    }

    public setNumberEnabled(numbersEnabled: boolean) {
        this._numbersEnabled = numbersEnabled;
    }

    public setSentencesEnabled(sentencesEnabled: boolean) {
        this._sentencesEnabled = sentencesEnabled;
    }

    public setWordsEnabled(wordsEnabled: boolean) {
        this._wordsEnabled = wordsEnabled;
    }

    public setSymbolsEnabled(symbolsEnabled: boolean) {
        this._symbolsEnabled = symbolsEnabled;
    }

    public setLowercaseEnabled(lowercaseEnabled: boolean) {
        this._lowercaseEnabled = lowercaseEnabled;
    }

}