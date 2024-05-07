import { Settings, SettingsType } from "./Settings";
import { TypingStat } from "./TypingStat";

// .ts extension because this will have no tsx syntax (html css stuff) because it's an object
export class User {
    private _settings: Settings;
    private _typingStats: TypingStat[];

    constructor(settings: Settings) {
        this._settings = settings;
        this._typingStats = [];
    }

    public pushTypingStat(typingStats: TypingStat) {
        this._typingStats.push(typingStats);
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

    public setSettings(settings: SettingsType) {
        this._settings.setSettings(settings);
    }

}

export const currentUser: User = new User(new Settings());

