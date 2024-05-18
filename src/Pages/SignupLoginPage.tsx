import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import { auth, dataBase, googleProvider } from "../config/firebase"
import { keyframes } from '@emotion/react';
import { signInWithPopup, signOut } from "firebase/auth"
import { currentUser } from "../objects/User";
import { DocumentData } from 'firebase/firestore';
import LogoNavBar from "../components/LogoNavBar";
import { TypingStatDataType, TypingStat } from "../objects/TypingStat";
import { SettingsDataType } from "../objects/Settings";
import { initializeOnSignupOrLogin, logout, signinWithGooglePopup, updateOnlineHistorySettings, updateOnlineSettings, updateOnlineTypingStats } from "../functions/Backend";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { TypingDataContext } from "../components/TypeFeedAreaDisplay";
import { useNavigate } from "react-router-dom";
import TwoPeakWaveSvg, { WavePropsType } from "../components/TwoPeakWaveSvg";
import OnePeakWaveSvg from "../components/OnePeakWaveSvg";
import { getLogo, getRandomShootingStar, getWaveAnimation } from "../functions/HelperFunction";
import DrawerButton from "../components/DrawerButton";
import ShootingStarsAnimation from "../components/ShootingStarsAnimation";
import zIndex from "@mui/material/styles/zIndex";
import LinksDisplay from "../components/LinksDisplay";
import MeteorShowerCloudOceanBackground from "../components/MeteorShowerCloudOceanBackground";
import CampUnderTwilightBackground from "../components/CampUnderTwilightBackground";

const SignupLoginPage = () => {

    var getSignupLoginButton = () => {
        if (auth.currentUser != null) { // for some reason using isUserLoggedIn doesen't work, idk... But we still need the state because setting isUserLoggedIn re-renders this component
            return <Button
                sx={{
                    color: 'white',
                    backgroundColor: '#292140',
                    borderRadius: '20px',
                    width: 'min-content',
                    textTransform: 'none', // for some reason text in button was all caps... This stops that!
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
                    textTransform: 'none', // for some reason text in button was all caps... This stops that!
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
        <CampUnderTwilightBackground occasionalShootingStar={true}>
            <Box sx={{ height: '100vh', width: '100vw', zIndex: 3 }}>
                <LogoNavBar hideLogo={true} />
                <Box style={{ height: '10vh' }} />
                <Grid item sx={{ zIndex: 1 }}>
                    <Stack
                        direction='column'
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {getLogo(2, 20)}
                        {getSignupLoginButton()}
                    </Stack>
                </Grid>
            </Box>
        </CampUnderTwilightBackground>
    </>)
}

export default SignupLoginPage