import { Box, Button, Stack, Typography } from "@mui/material"
import { auth, dataBase, googleProvider } from "../config/firebase"
import { keyframes } from '@emotion/react';
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
//import { ReactComponent as OnePeakWaveSvg } from '../svgFiles/onePeakWave.svg'


const SignupLoginPage = () => {

    var getSignupLoginButton = () => {
        if (auth.currentUser != null) { // for some reason using isUserLoggedIn doesen't work, idk... But we still need the state because setting isUserLoggedIn re-renders this component
            return <Button onClick={() => {
                logout();
            }}>Logout</Button>;
        } else {
            return <Button onClick={async () => {
                await signinWithGooglePopup();
            }}>Signup/Login with google</Button>
        }
    }

    const moveLeftToRight = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100vw); // Adjust the distance as needed
    }
  `;

    <Box sx={{
        width: '100vw',
        height: '100vh'
    }}>

    </Box>

    return (<>
        <Box
            overflow={'hidden'}
        >
            <Box sx={{
                width: '100vw',
                height: '50px',
                //    viewBox="0 0 100 50",
                //  backgroundImage: 'url("./svgFiles/onePeakWave.svg")',
                animation: `${moveLeftToRight} 5s forwards linear`,
                backgroundRepeat: 'no-repeat',
            }}>
                <svg
                    width="200px" // Set the desired width
                    height="100px" // Set the desired height
                >
               
                </svg>
            </Box>
        </Box >
    </>)
}

export default SignupLoginPage