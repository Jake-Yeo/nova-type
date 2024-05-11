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
        if (auth.currentUser.uid != null) {
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
async function firstTimeUserDataSetup() {
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

    if (!isUserLoggedIn()) {
        throw new Error("Can't initialize! User not logged in!");
    }
    
    let historySettingData;
    let settingsData;
    let typingStatsData;

    try {

        historySettingData = await getOnlineHistorySettingsData();
        settingsData = await getOnlineSettingsData();
        typingStatsData = await getOnlineTypingStatsData();

        currentUser.overrideHistorySettings(historySettingData);

        currentUser.overrideWithSettingsData(settingsData);

        currentUser.overrideWithTypingStatData(typingStatsData);

        console.log('Succesfully initialized users data!');

    } catch (err) {
        console.log('First time log in, setting up user data');
        await firstTimeUserDataSetup();
        console.log('Succesfully set up users data!');
        return;
    }
}

// update online data objects
export async function updateOnlineSettings() {

    if (!isUserLoggedIn()) {
        throw new Error("Can't update user not logged in!");
    }

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    // Create a subcollection under the parent document
    const userSettingsCollection = userDoc.collection('settings');

    try {

        await userSettingsCollection.doc('setting').update(currentUser.getSettings().toDoc());

    } catch (err) {
        console.error(err);
    }
}

export async function updateOnlineHistorySettings() {

    if (!isUserLoggedIn()) {
        throw new Error("Can't update user not logged in!");
    }

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const userHistorySettingsCollection = userDoc.collection('historySettings');

    try {

        await userHistorySettingsCollection.doc('historySetting').set(currentUser.getHistorySettings().toDoc());

    } catch (err) {

    }
}

export async function updateOnlineTypingStats() {

    if (!isUserLoggedIn()) {
        throw new Error("Can't update user not logged in!");
    }

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const userTypingStatArraysCollection = userDoc.collection('typingStatArrays');

    try {

        await userTypingStatArraysCollection.doc('typingStatArray').set(currentUser.typingStatsToDoc());

    } catch (err) {

    }
}


// get data objects
async function getOnlineSettingsData(): Promise<SettingsDataType> {

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const settingSnapshot = await userDoc.collection('settings').doc('setting').get();

    if (settingSnapshot.exists) {
        const dirtySettingData = settingSnapshot.data() ?? {};
        console.log(dirtySettingData);
        const settingData: SettingsDataType = { ...dirtySettingData } as SettingsDataType;
        return (settingData);
    } else {
        throw new Error("failed to get settings data");
    }
}

async function getOnlineHistorySettingsData(): Promise<HistorySettingsDataType> {

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const historySettingSnapshot = await userDoc.collection('historySettings').doc('historySetting').get();

    if (historySettingSnapshot.exists) {
        const dirtyHistorySettingData = historySettingSnapshot.data() ?? {};
        console.log(historySettingSnapshot);
        const historySettingsData: HistorySettingsDataType = { ...dirtyHistorySettingData } as HistorySettingsDataType;
        return (historySettingsData);
    } else {
        throw new Error("failed to get history settings data");
    }
}

async function getOnlineTypingStatsData(): Promise<TypingStatDataType[]> {

    const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);

    const typingStatSnapshot = await userDoc.collection('typingStatArrays').doc('typingStatArray').get();

    if (typingStatSnapshot.exists) {
        const typingStatData = typingStatSnapshot.data();
        console.log(typingStatData);
        const typingStatsArray: TypingStatDataType[] = Object.values(typingStatData ?? {}).at(0);
        return typingStatsArray;
    } else {
        throw new Error('failed to get typing stats data')
    }
}

