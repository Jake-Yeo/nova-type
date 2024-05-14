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
import TwoPeakWaveSvg, { WavePropsType } from "../components/TwoPeakWaveSvg";
import OnePeakWaveSvg from "../components/OnePeakWaveSvg";

export const getWaveAnimation = (height: string, opacity: number, direction: string, durationSecs: number, WaveElement: ({ width, height, opacity }: WavePropsType) => JSX.Element) => {

    var moveLeftToRight = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100vw); // Adjust the distance as needed
    }
  `;

    var moveOutToRight = keyframes`
  from {
    transform: translateX(-100vw);
  }
  to {
    transform: translateX(0vw); // Adjust the distance as needed
  }
`;

    if (direction === 'backwards') {
        moveOutToRight = keyframes`
    from {
      transform: translateX(100vw);
    }
    to {
      transform: translateX(0vw); // Adjust the distance as needed
    }
  `;

        moveLeftToRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100vw); // Adjust the distance as needed
  }
`;
    }

    return (<>
        <Box sx={{
            width: '100vw',
            height: height,
            animation: `${moveLeftToRight} ${durationSecs}s ${direction} linear infinite`,
            position: 'absolute',
            bottom: '0',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
        }}>
            <WaveElement width={'100vw'} height={height} opacity={opacity}></WaveElement>
        </Box>
        <Box sx={{
            width: '100vw',
            height: height,
            animation: `${moveOutToRight} ${durationSecs}s ${direction} linear infinite`,
            position: 'absolute',
            bottom: '0',
            backgroundRepeat: 'no-repeat',
            zIndex: -1
        }}>
            <WaveElement width={'100vw'} height={height} opacity={opacity}></WaveElement>
        </Box></>)
}

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

    return (<>
        <Box
            overflow={'hidden'}
            sx={{
                width: '100vw',
                height: '100vh',
                position: 'relative'
            }}
        >
            {getSignupLoginButton()}
            {getWaveAnimation('10vh', 0.25, 'forwards', 8, OnePeakWaveSvg)}
            {getWaveAnimation('15vh', 0.25, 'forwards', 5, TwoPeakWaveSvg)}
            {getWaveAnimation('18vh', 0.25, 'backwards', 9, TwoPeakWaveSvg)}

            {getWaveAnimation('20vh', 0.25, 'backwards', 11, OnePeakWaveSvg)}
            {getWaveAnimation('15vh', 0.25, 'forwards', 8, TwoPeakWaveSvg)}
            {getWaveAnimation('25vh', 0.25, 'forwards', 15, TwoPeakWaveSvg)}
        </Box >
    </>)
}

export default SignupLoginPage