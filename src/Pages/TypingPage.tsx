import { Box, Grid, Stack } from "@mui/material"
import LogoNavBar from "../components/LogoNavBar"
import SettingsIsland from "../components/SettingsIsland"
import TypeFeedAreaDisplay from "../components/TypeFeedAreaDisplay"
import LinksDisplay from "../components/LinksDisplay"
import OnePeakWaveSvg from "../components/OnePeakWaveSvg"
import TwoPeakWaveSvg from "../components/TwoPeakWaveSvg"
import { getWaveAnimation } from "../functions/HelperFunction"

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
            <Grid item>
                <LinksDisplay></LinksDisplay>
                <Box
                    sx={{
                        position: 'relative',
                        bottom: 0,
                        width: '100vw',
                        margin: 0, // Set margin to 0 to remove any default spacing
                        padding: 0, // Set padding to 0 to remove any default padding
                    }}
                >
                    {getWaveAnimation('7vh', 0.25, 'forwards', 8, OnePeakWaveSvg)}
                    {getWaveAnimation('10vh', 0.25, 'forwards', 5, TwoPeakWaveSvg)}
                    {getWaveAnimation('13vh', 0.25, 'backwards', 9, TwoPeakWaveSvg)}

                    {getWaveAnimation('15vh', 0.25, 'backwards', 11, OnePeakWaveSvg)}
                    {getWaveAnimation('10vh', 0.25, 'forwards', 8, TwoPeakWaveSvg)}
                    {getWaveAnimation('16vh', 0.25, 'forwards', 15, TwoPeakWaveSvg)}
                </Box>
            </Grid>
        </Stack>
    </>)
}

export default TypingPage