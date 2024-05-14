import { json } from "stream/consumers";
import { DocumentData } from 'firebase/firestore';

export type HistorySettingsDataType = { // data indicates no functions
    fontSize: number
}

export class HistorySettings {
    private _fontSize;

    constructor() {
        this._fontSize = 20;
    }

    public setHistorySettings({fontSize}: HistorySettingsDataType) {
        this._fontSize = fontSize;
    }

    public getFontSize(): number {
        return this._fontSize;
    }

    public setFontSize(fontSize: number) {
        this._fontSize = fontSize;
    }

    public toDoc(): DocumentData {
        const docToReturn = {
            fontSize: this.getFontSize(),
        }
        return docToReturn;
    }
}