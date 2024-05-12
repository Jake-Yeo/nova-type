import { initializeOnSignupOrLogin, isUserLoggedIn } from "../functions/Backend";
import { HistorySettings, HistorySettingsDataType } from "./HistorySettings";
import { Settings, SettingsDataType } from "./Settings";
import { TypingStatDataType, TypingStat } from "./TypingStat";
import { DocumentData } from 'firebase/firestore';

// .ts extension because this will have no tsx syntax (html css stuff) because it's an object
export class User {
    private _settings: Settings;
    private _historySettings: HistorySettings;
    private _typingStats: TypingStat[];

    constructor() {
        this._settings = new Settings();
        this._historySettings = new HistorySettings();
        this._typingStats = [];
    }

    // This function should be ran if and only if the user logs out! Pretty much identical to the constructor
    public reset() {
        this._settings = new Settings();
        this._historySettings = new HistorySettings();
        this._typingStats = [];
    }

    public pushTypingStat(typingStats: TypingStat) {
        this._typingStats.push(typingStats);
    }

    public overrideWithTypingStatData(typingStatDataArray: TypingStatDataType[]) {
        this._typingStats = [];
        for (let typingStatObject of typingStatDataArray) {

            const statsObject: TypingStatDataType = {...typingStatObject};

            this.pushTypingStat(new TypingStat(statsObject));
        }
    }

    public overrideWithSettingsData(settingsData: SettingsDataType) {
        this._settings.setSettings(settingsData);
    }

    public overrideHistorySettings(historySettingsData: HistorySettingsDataType) {
        this._historySettings.setHistorySettings(historySettingsData);
    }

    public getTypingStats(): TypingStat[] {
        return this._typingStats;
    }

    public clearTypingStats() {
        this._typingStats = [];
    }

    public getSettings(): Settings {
        return this._settings;
    }

    public getHistorySettings(): HistorySettings {
        return this._historySettings;
    }

    public setSettings(settings: SettingsDataType) {
        this._settings.setSettings(settings);
    }

    public typingStatsToDoc(): DocumentData {
        const typingStatsJson: DocumentData[] = [];

        for (let typingStat of this.getTypingStats()) {
            typingStatsJson.push(typingStat.toDoc());
        }
        console.log(typingStatsJson);
        return { typingStats: typingStatsJson };
    }
}

export const currentUser: User = new User();

// data base will store a bunch of user collections, each user will have settings, history settings, and typingStats collections which each have their own fields