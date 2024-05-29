import { Box, Grid, Stack, Typography } from "@mui/material"
import HistoryList from "../components/HistoryList"
import LogoNavBar from "../components/LogoNavBar"
import { TypingDataContext } from "../components/TypeFeedAreaDisplay"
import { useContext, useEffect, useReducer, useState } from "react"
import { currentUser } from "../objects/User"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"
import { getRandomShootingStar, getWaveAnimation, purgeAllStylesWithGlobalId } from "../functions/HelperFunction"
import OnePeakWaveSvg from "../components/OnePeakWaveSvg"
import TwoPeakWaveSvg from "../components/TwoPeakWaveSvg"
import LinksDisplay from "../components/LinksDisplay"
import MeteorShowerCloudOceanBackground from "../components/MeteorShowerCloudOceanBackground"

const HistoryPage = () => {

    let historyPageContents;

    if (currentUser.getTypingStats().length === 0) {
        historyPageContents = <Typography color='white'>Empty! Type something first then come back!</Typography>;
    } else {
        historyPageContents = <HistoryList />;
    }

    useEffect(() => {
        return (() => {
            purgeAllStylesWithGlobalId(); // basically remove all style elements relating to the animations which were generating (although styles dissapear when the timer ends, if the page switches before the timer ends, then the style will not be deleted)
        })
    }, [])

    return (<>
        <MeteorShowerCloudOceanBackground>
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
            </Stack>
            <Box sx={{
                    width: '100vw',
                    bottom: '0px'
                }}>
                    <LinksDisplay />
                </Box>
        </MeteorShowerCloudOceanBackground>
    </>)
}

export default HistoryPage