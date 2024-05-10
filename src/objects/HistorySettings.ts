import { json } from "stream/consumers";
import { DocumentData } from 'firebase/firestore';

type HistorySettingsType = {
    fontSize: number
}

export class HistorySettings {
    private _fontSize;

    constructor({fontSize}: HistorySettingsType) {
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