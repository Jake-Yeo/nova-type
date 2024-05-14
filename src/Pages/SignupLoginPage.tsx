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
import { getLogo, getWaveAnimation } from "../functions/HelperFunction";

const SignupLoginPage = () => {

    const navigate = useNavigate();

    var getSignupLoginButton = () => {
        if (auth.currentUser != null) { // for some reason using isUserLoggedIn doesen't work, idk... But we still need the state because setting isUserLoggedIn re-renders this component
            return <Button
                sx={{
                    color: 'white',
                    backgroundColor: '#292140',
                    borderRadius: '20px',
                    width: 'min-content',
                    '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                        backgroundColor: '#393055',
                    },
                }}
                onClick={() => {
                    logout();
                }}>Logout</Button>;
        } else {
            return <Button
                sx={{
                    color: 'white',
                    backgroundColor: '#292140',
                    borderRadius: '20px',
                    width: 'min-content',
                    '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                        backgroundColor: '#393055',
                    },
                }}
                onClick={async () => {
                    await signinWithGooglePopup();
                }}>Signup/Login with Google</Button>
        }
    }

    return (<>
        <Stack // Please fix overflow on mobile, they cant scroll!
            direction='column'
            justifyContent='space-between'
            alignItems={'center'}
            height='100vh'
            width='100vw'
            sx={{
                overflowX: 'hidden',
                position: 'relative'
            }}
        >
            <Stack
                direction='column'
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Box style={{ height: '30vh' }}>

                </Box>
                {getLogo(45)}
                {getSignupLoginButton()}
                <Button
                    sx={{
                        color: 'white',
                        backgroundColor: '#292140',
                        borderRadius: '20px',
                        width: 'min-content',
                        marginTop: '10px',
                        '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                            backgroundColor: '#393055',
                        },
                    }}
                    onClick={async () => {
                        navigate('/TypingPage');
                    }}>Continue</Button>
            </Stack>
            <Box
                sx={{
                    position: 'relative',
                    bottom: 0,
                    width: '100vw',
                    margin: 0, // Set margin to 0 to remove any default spacing
                    padding: 0, // Set padding to 0 to remove any default padding
                }}
            >
                {getWaveAnimation('10vh', 0.25, 'forwards', 8, OnePeakWaveSvg)}
                {getWaveAnimation('15vh', 0.25, 'forwards', 5, TwoPeakWaveSvg)}
                {getWaveAnimation('18vh', 0.25, 'backwards', 9, TwoPeakWaveSvg)}

                {getWaveAnimation('20vh', 0.25, 'backwards', 11, OnePeakWaveSvg)}
                {getWaveAnimation('15vh', 0.25, 'forwards', 8, TwoPeakWaveSvg)}
                {getWaveAnimation('25vh', 0.25, 'forwards', 15, TwoPeakWaveSvg)}
            </Box >
        </Stack>
    </>)
}

export default SignupLoginPage