import { Button } from "@mui/material"
import { auth, dataBase, googleProvider } from "../config/firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import { currentUser } from "../objects/User";
import { DocumentData } from 'firebase/firestore';
import LogoNavBar from "../components/LogoNavBar";

const signInWithGoogle = async () => {// we should put this in its own class
    try {
        await signInWithPopup(auth, googleProvider);

    } catch (err) {
        console.error(err);
    }
}

const logout = async () => {// we should put this in its own class
    try {
        await signOut(auth);
    } catch (err) {
        console.error(err);
    }
}


const SignupLoginPage = () => {


    return (<>
        <LogoNavBar></LogoNavBar>
        <Button onClick={() => { signInWithGoogle() }}>Signup/Login with google</Button>
        <Button onClick={() => { logout() }}>Logout</Button>
        <Button onClick={() => { console.log(auth.currentUser?.uid) }}>check uid</Button>
        <Button onClick={() => { console.log(auth.currentUser?.email) }}>check email of current user</Button>

        <Button onClick={async () => {

            const userDoc = dataBase.collection('Users').doc(auth.currentUser?.uid);
            await userDoc.set({
                email: auth.currentUser?.email,
            });

            // Create a subcollection under the parent document
            const userSettingsCollection = userDoc.collection('settings');
            const userHistorySettingsCollection = userDoc.collection('historySettings');
            const userTypingStatsCollection = userDoc.collection('typingStats');

            await userSettingsCollection.add(currentUser.getSettings().toDoc());

            await userHistorySettingsCollection.add(currentUser.getHistorySettings().toDoc());

            await userTypingStatsCollection.add(currentUser.typingStatsToDoc());
        }}>add stuff to database</Button>
    </>)
}

export default SignupLoginPage