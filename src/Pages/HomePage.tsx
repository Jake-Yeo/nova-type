import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import OnePeakWaveSvg from "../components/OnePeakWaveSvg";
import { getLogo, getRandomNumber, getRandomShootingStar, getSvgBox, getWaveAnimation, purgeAllStylesWithGlobalId } from "../functions/HelperFunction";
import TwoPeakWaveSvg from "../components/TwoPeakWaveSvg";
import DrawerButton from "../components/DrawerButton";
import { useEffect, useRef, useState } from "react";
import LinksDisplay from "../components/LinksDisplay";
import MountainSvg from "../components/MountainBaseSvg";
import TentSvg from "../components/TentSvg";
import CampFireSvg from "../components/CampFireSvg";
import MountainBaseSvg from "../components/MountainBaseSvg";
import MountainRocksSvg from "../components/MountainRocksSvg";
import CampFireAnimation from "../components/CampFireAnimation";
import TwinklingStarsAnimation from "../components/TwinklingStarsAnimation";
import { useNavigate } from "react-router-dom";
import MeteorShowerAnimation from "../components/MeteorShowerAnimation";
import CloudOceanAnimation from "../components/CloudOceanAnimation";
import MeteorShowerCloudOceanBackground from "../components/MeteorShowerCloudOceanBackground";
import CampUnderTwilightBackground from "../components/CampUnderTwilightBackground";
import LogoNavBar from "../components/LogoNavBar";


const HomePage = () => {

    const navigate = useNavigate();

    const toScrollToRef = useRef<HTMLDivElement>(null);

    const firstPage = <MeteorShowerCloudOceanBackground>
        <Box sx={{
            position: 'absolute',
            width: '100vw',
            bottom: '0px',
        }}>
            <LinksDisplay />
        </Box>
        <Box sx={{
            position: 'absolute',
            bottom: '0px',
            height: '1px',
            width: '100vw',
            backgroundColor: '#8C83A4', // This will fill in the gap between the two pages between the wave!
            overflowX: 'hidden',
        }} />
        <LogoNavBar hideLogo={true} />
        <Grid item>
            <Stack
                direction='column'
                alignItems={'center'}
                justifyContent={'center'}
            >
                {getLogo(2, 20)}
                <Button
                    onClick={() => toScrollToRef.current?.scrollIntoView({ behavior: 'smooth' as ScrollBehavior, })}
                    sx={{
                        color: '#635985',
                        backgroundColor: '#292140',
                        borderRadius: '20px',
                        textTransform: 'none', // for some reason text in button was all caps... This stops that!
                        '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                            backgroundColor: '#393055',
                        },
                    }}>
                    <Typography sx={{
                        color: 'white',
                        fontSize: '20px',
                        zIndex: 10
                    }}>{"Welcome Click to Learn More!"}</Typography>
                </Button>
                <Box style={{ height: '43vh', zIndex: 1 }}>
                </Box>
            </Stack>
        </Grid>
    </MeteorShowerCloudOceanBackground>

    const secondPage =
        <CampUnderTwilightBackground occasionalShootingStar={true}>
            <Typography sx={{ color: 'white', maxWidth: '70vw', textAlign: 'center', marginBottom: '10px' }}>Welcome to NovaType, a visually stunning typing experience set against a backdrop of a beautiful space themed environment, meant to help users improve typing accuracy and dexterity.</Typography>
            <Button
                onClick={() => {
                    navigate("/TypingPage")
                }}
                sx={{
                    color: '#635985',
                    backgroundColor: '#372F4E',
                    borderRadius: '20px',
                    textTransform: 'none', // for some reason text in button was all caps... This stops that!
                    '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                        backgroundColor: '#5B546E',
                    },
                }}>
                <Typography sx={{
                    color: 'white',
                    fontSize: '20px',
                    zIndex: 1000,
                }}>{"Click Here to Play!"}</Typography>
            </Button>
            <Box sx={{
                position: 'absolute',
                top: '0px',
                height: '0px',
                width: '100vw',
                backgroundColor: '#8C83A4', // This will fill in the gap between the two pages between the wave!
                overflowX: 'hidden',
            }} />
            <div ref={toScrollToRef}></div>
        </CampUnderTwilightBackground>

    useEffect(() => {
        return (() => {
            purgeAllStylesWithGlobalId(); // basically remove all style elements relating to the animations which were generating (although styles dissapear when the timer ends, if the page switches before the timer ends, then the style will not be deleted)
        })
    }, [])

    return (<>
        <div className="scrollCss"
            key='scrollPane'
            contentEditable={false}
            style={{
                height: '100vh',
                width: '100vw',
                overflowX: 'hidden',
                overflowY: 'hidden',
            }}
        >
            {firstPage}
            {secondPage}
        </div>

    </>)
}

/** /// find out where to place this...
 * 
 *             <Box sx={{
                position: 'absolute',
                bottom: '-5px',
                height: '5px',
                width: '100vw',
                backgroundColor: '#8C83A4', // This will fill in the gap between the two pages between the wave!
                overflowX: 'hidden',
            }} />
 */

export default HomePage