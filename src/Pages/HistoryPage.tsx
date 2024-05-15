import { Box, Stack, Typography } from "@mui/material"
import HistoryList from "../components/HistoryList"
import LogoNavBar from "../components/LogoNavBar"
import { TypingDataContext } from "../components/TypeFeedAreaDisplay"
import { useContext, useEffect, useReducer } from "react"
import { currentUser } from "../objects/User"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { getWaveAnimation } from "../functions/HelperFunction"
import OnePeakWaveSvg from "../components/OnePeakWaveSvg"
import TwoPeakWaveSvg from "../components/TwoPeakWaveSvg"

const HistoryPage = () => {

    let historyPageContents;

    if (currentUser.getTypingStats().length === 0) {
        historyPageContents = <Typography color='white'>Empty! Type something first then come back!</Typography>;
    } else {
        historyPageContents = <HistoryList />;
    }

    return (<>
        <Stack
            sx={{ overflowX: 'hidden' }}
            justifyContent={"flex-start"}
            width={"100vw"}
            height={"100vh"}
            alignItems={"center"}
            position={'relative'}
        >
            <LogoNavBar></LogoNavBar>
            {historyPageContents}
            <Box
                sx={{
                    position: 'fixed', // can't seem to get this to work with relative, so just used fixed instead
                    bottom: 0,
                    width: '100vw',
                    margin: 0, // Set margin to 0 to remove any default spacing
                    padding: 0, // Set padding to 0 to remove any default padding
                    zIndex: -1,
                }}
            >
                {getWaveAnimation('10vh', 0.25, 'forwards', 8, OnePeakWaveSvg)}
                {getWaveAnimation('15vh', 0.25, 'forwards', 5, TwoPeakWaveSvg)}
                {getWaveAnimation('18vh', 0.25, 'backwards', 9, TwoPeakWaveSvg)}

                {getWaveAnimation('20vh', 0.25, 'backwards', 11, OnePeakWaveSvg)}
                {getWaveAnimation('15vh', 0.25, 'forwards', 8, TwoPeakWaveSvg)}
                {getWaveAnimation('25vh', 0.25, 'forwards', 15, TwoPeakWaveSvg)}
            </Box>
        </Stack>
    </>)
}

export default HistoryPage