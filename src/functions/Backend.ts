import { signInWithPopup, signOut } from "firebase/auth";
import { auth, dataBase, googleProvider } from "../config/firebase";
import { currentUser } from "../objects/User";
import { TypingStatDataType } from "../objects/TypingStat";
import { SettingsDataType } from "../objects/Settings";
import { HistorySettingsDataType } from "../objects/HistorySettings";

export async function signinWithGooglePopup() {
    try {
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);
    }
}

export function isUserLoggedIn(): boolean { 
    if (auth.currentUser) {
        if ( auth.currentUser.uid != null) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

export async function logout() {
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
}

export function deleteAccount() {

}

// Should only ever be run once unless user deletes their account
export async function setupUserData() {
    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    // Create a subcollection under the parent document
    const userSettingsCollection = userDoc.collection('settings');
    const userHistorySettingsCollection = userDoc.collection('historySettings');
    const userTypingStatArraysCollection = userDoc.collection('typingStatArrays');

    try {

        await userSettingsCollection.doc('setting').set(currentUser.getSettings().toDoc());

        await userHistorySettingsCollection.doc('historySetting').set(currentUser.getHistorySettings().toDoc());

        await userTypingStatArraysCollection.doc('typingStatArray').set(currentUser.typingStatsToDoc());

    } catch (err) {
        console.error(err);
    }
}

// initialize user data

export async function initializeOnSignupOrLogin() {
    let historySettingData;
    let settingsData;
    let typingStatsData;

    try {
        historySettingData = await getOnlineHistorySettingsData();
        settingsData = await getOnlineSettingsData();
        typingStatsData = await getOnlineTypingStatsData();
    } catch (err) {
        console.error(err);
    }

    if (isUserLoggedIn()) {
        if (historySettingData) {
            currentUser.overrideHistorySettings(historySettingData);
        } else {
            console.error('initalize for history settings data failed');
        }
        if (settingsData) {
            currentUser.overrideWithSettingsData(settingsData);
        } else {
            console.error('initalize for settings data failed');
        }
        if (typingStatsData) {
            currentUser.overrideWithTypingStatData(typingStatsData);
        } else {
            console.error('initalize for typing stats data failed');
        }
    } else {
        console.error('initialization failed, user is not logged in');
    }
}

// update online data objects
export async function updateOnlineSettings() {

}

export async function updateOnlineHistorySettings() {

}

export async function updateOnlineTypingStats() {

}


// get data objects
async function getOnlineSettingsData(): Promise<SettingsDataType | undefined> {

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const settingSnapshot = await userDoc.collection('settings').doc('setting').get();

    if (settingSnapshot.exists) {
        const dirtySettingData = settingSnapshot.data() ?? {};
        console.log(dirtySettingData);
        const settingData: SettingsDataType = { ...dirtySettingData } as SettingsDataType;
        return (settingData);
    } else {
        console.error("failed to get settings data");
        return undefined
    }
}

async function getOnlineHistorySettingsData(): Promise<HistorySettingsDataType | undefined> {

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const historySettingSnapshot = await userDoc.collection('historySettings').doc('historySetting').get();

    if (historySettingSnapshot.exists) {
        const dirtyHistorySettingData = historySettingSnapshot.data() ?? {};
        console.log(historySettingSnapshot);
        const historySettingsData: HistorySettingsDataType = { ...dirtyHistorySettingData } as HistorySettingsDataType;
        return (historySettingsData);
    } else {
        console.error("failed to get history settings data");
        return undefined
    }
}

async function getOnlineTypingStatsData(): Promise<TypingStatDataType[] | undefined> {

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const typingStatSnapshot = await userDoc.collection('typingStatArrays').doc('typingStatArray').get();

    if (typingStatSnapshot.exists) {
        const typingStatData = typingStatSnapshot.data();
        console.log(typingStatData);
        const typingStatsArray: TypingStatDataType[] = Object.values(typingStatData ?? {}).at(0);
        return typingStatsArray;
    } else {
        console.error('failed to get typing stats data')
        return undefined;
    }
}

