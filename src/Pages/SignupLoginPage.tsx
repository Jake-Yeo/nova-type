import { Button } from "@mui/material"
import { auth, dataBase, googleProvider } from "../config/firebase"
import { signInWithPopup, signOut } from "firebase/auth"
import { currentUser } from "../objects/User";
import { DocumentData } from 'firebase/firestore';
import LogoNavBar from "../components/LogoNavBar";
import { TypingStatDataType, TypingStat } from "../objects/TypingStat";
import { SettingsDataType } from "../objects/Settings";
import { initializeOnSignupOrLogin, logout, signinWithGooglePopup, updateOnlineHistorySettings, updateOnlineSettings, updateOnlineTypingStats } from "../functions/Backend";
import { useContext, useEffect, useReducer, useState } from "react";
import { TypingDataContext } from "../components/TypeFeedAreaDisplay";
import { useNavigate } from "react-router-dom";


const SignupLoginPage = () => {

    const navigate = useNavigate();

    var getSignupLoginButton = () => {
        if (auth.currentUser != null) { // for some reason using isUserLoggedIn doesen't work, idk... But we still need the state because setting isUserLoggedIn re-renders this component
            return <Button onClick={() => {
                logout();
                navigate('/TypingPage');
            }}>Logout</Button>;
        } else {
            return <Button onClick={async () => {
                await signinWithGooglePopup();
                if (auth.currentUser != null) {
                    navigate('/TypingPage');
                }
            }}>Signup/Login with google</Button>
        }
    }



    return (<>
        <LogoNavBar></LogoNavBar>
        {getSignupLoginButton()};
    </>)
}

export default SignupLoginPage