import { Button } from "@mui/material"
import { auth, dataBase, googleProvider } from "../config/firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import { currentUser } from "../objects/User";
import { DocumentData } from 'firebase/firestore';
import LogoNavBar from "../components/LogoNavBar";
import { TypingStatDataType, TypingStat } from "../objects/TypingStat";
import { SettingsDataType } from "../objects/Settings";
import { initializeOnSignupOrLogin, logout, signinWithGooglePopup, updateOnlineHistorySettings, updateOnlineSettings, updateOnlineTypingStats } from "../functions/Backend";
import { useEffect, useState } from "react";

export var setIsUserLoggedInForSignupPage = (isUserLoggedIn: boolean) => { };

const SignupLoginPage = () => {


    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);


    setIsUserLoggedInForSignupPage = setIsUserLoggedIn;

    const getButton = () => {
        if (isUserLoggedIn) {
            return <Button onClick={() => { logout() }}>Logout</Button>;
        } else {
            return <Button onClick={() => { signinWithGooglePopup() }}>Signup/Login with google</Button>
        }
    }

    return (<>
        <LogoNavBar></LogoNavBar>
        {getButton()};
        <Button onClick={() => { console.log(auth.currentUser?.uid) }}>check uid</Button>
        <Button onClick={() => { console.log(auth.currentUser?.email) }}>check email of current user</Button>
    </>)
}

export default SignupLoginPage