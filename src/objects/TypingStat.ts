import { json } from "stream/consumers";
import { DocumentData } from 'firebase/firestore';


export type StatsType = {
    wpm: number;
    accuracy: number;
    generatedPrompt: string;
    typedPrompt: string;
    duration: number;
    startTime: number;
    endTime: number;
}

export class TypingStat {

    private _wpm: number;
    private _accuracy: number;
    private _generatedPrompt: string; // underscore _ is just the convention for if it's private, also doing TypingStats._wpm just used the getWpm() function
    private _typedPrompt: string;
    private _duration: number;
    private _startTime: number;
    private _endTime: number;

    constructor({ wpm, accuracy, generatedPrompt, typedPrompt, duration, startTime, endTime }: StatsType) {
        this._wpm = wpm;
        this._accuracy = accuracy;
        this._generatedPrompt = generatedPrompt;
        this._typedPrompt = typedPrompt;
        this._duration = duration;
        this._endTime = endTime;
        this._startTime = startTime;
    }

    // get methods

    public getWpm(): number {
        return this._wpm;
    }

    public getGeneratedPrompt(): string {
        return this._generatedPrompt;
    }

    public getTypedPrompt(): string {
        return this._typedPrompt;
    }

    public getDuration(): number {
        return this._duration;
    }

    public getStartTime(): number {
        return this._startTime;
    }

    public getEndTime(): number {
        return this._endTime;
    }

    public getAccuracy(): number {
        return this._accuracy;
    }

    // Set methods

    public setWpm(wpm: number) {
        this._wpm = wpm;
    }

    public setGeneratedPrompt(generatedPrompt: string) {
        this._generatedPrompt = generatedPrompt
    }

    public setTypedPrompt(typedPrompt: string) {
        this._typedPrompt = typedPrompt;
    }

    public setDuration(duration: number) {
        this._duration = duration;
    }

    public setStartTime(startTime: number) {
        this._startTime = startTime;
    }

    public setEndTime(endTime: number) {
        this._endTime = endTime;
    }

    public setAccuracy(accuracy: number) {
        this._accuracy = accuracy;
    }

    public toDoc(): DocumentData {
        const docToReturn = {
            wpm: this.getWpm(),
            accuracy: this.getAccuracy(),
            generatedPrompt: this.getGeneratedPrompt(),
            typedPrompt: this.getTypedPrompt(),
            duration: this.getDuration(),
            startTime: this.getStartTime(),
            endTime: this.getEndTime()
        }
        return docToReturn;
    }

}
