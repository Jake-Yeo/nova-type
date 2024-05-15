import { Box, Grid, Stack } from "@mui/material"
import LogoNavBar from "../components/LogoNavBar"
import SettingsIsland from "../components/SettingsIsland"
import TypeFeedAreaDisplay from "../components/TypeFeedAreaDisplay"
import LinksDisplay from "../components/LinksDisplay"
import OnePeakWaveSvg from "../components/OnePeakWaveSvg"
import TwoPeakWaveSvg from "../components/TwoPeakWaveSvg"
import { getRandomShootingStar, getWaveAnimation } from "../functions/HelperFunction"
import { useEffect, useState } from "react"

const TypingPage = () => {

    return (<>
        <Stack // Please fix overflow on mobile, they cant scroll!
            direction='column'
            justifyContent='space-between'
            height='100vh'
            width='100vw'
            sx={{
                overflowX: 'hidden',
                position: 'relative'
            }}
        >
            <Grid
                container
                direction='column'
                justifyContent='space-between'
                width='100vw'
            >
                <LogoNavBar></LogoNavBar>
                <TypeFeedAreaDisplay></TypeFeedAreaDisplay>

            </Grid>
            <Grid item
                sx={{
                    position: 'relative'
                }}
            >
                <LinksDisplay></LinksDisplay>
                <Box
                    sx={{
                        position: 'absolute',
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
            </Grid>
        </Stack>
    </>)
}

export default TypingPage