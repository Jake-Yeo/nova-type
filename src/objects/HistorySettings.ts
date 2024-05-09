import { json } from "stream/consumers";

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

    public toJson(): JSON {
        const jsonToReturn: unknown = {
            fontSize: this.getFontSize(),
        }
        return jsonToReturn as JSON;
    }
}