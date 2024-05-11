import { Button } from "@mui/material"
import { auth, dataBase, googleProvider } from "../config/firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import { currentUser } from "../objects/User";
import { DocumentData } from 'firebase/firestore';
import LogoNavBar from "../components/LogoNavBar";
import { TypingStatDataType, TypingStat } from "../objects/TypingStat";
import { SettingsDataType } from "../objects/Settings";
import { initializeOnSignupOrLogin, logout, signinWithGooglePopup, updateOnlineHistorySettings, updateOnlineSettings, updateOnlineTypingStats } from "../functions/Backend";


const SignupLoginPage = () => {


    return (<>
        <LogoNavBar></LogoNavBar>
        <Button onClick={() => { signinWithGooglePopup() }}>Signup/Login with google</Button>
        <Button onClick={() => { logout() }}>Logout</Button>
        <Button onClick={() => { console.log(auth.currentUser?.uid) }}>check uid</Button>
        <Button onClick={() => { console.log(auth.currentUser?.email) }}>check email of current user</Button>
        <Button onClick={() => {
            updateOnlineHistorySettings();
            updateOnlineSettings();
            updateOnlineTypingStats();
        }}>Update data</Button>
        <Button onClick={async () => {
            await initializeOnSignupOrLogin();
        }}>(simulate login/signup data setup)</Button>
    </>)
}

export default SignupLoginPage