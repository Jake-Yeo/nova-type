import { Box, Grid, Stack, Typography } from "@mui/material";
import OnePeakWaveSvg from "../components/OnePeakWaveSvg";
import { getLogo, getRandomNumber, getRandomShootingStar, getSvgBox, getWaveAnimation } from "../functions/HelperFunction";
import TwoPeakWaveSvg from "../components/TwoPeakWaveSvg";
import DrawerButton from "../components/DrawerButton";
import { useEffect, useState } from "react";
import LinksDisplay from "../components/LinksDisplay";
import MountainSvg from "../components/MountainBaseSvg";
import TentSvg from "../components/TentSvg";
import CampFireSvg from "../components/CampFireSvg";
import MountainBaseSvg from "../components/MountainBaseSvg";
import MountainRocksSvg from "../components/MountainRocksSvg";
import CampFireAnimation from "../components/CampFireAnimation";
import TwinklingStarsAnimation from "../components/TwinklingStarsAnimation";


const HomePage = () => {

    const [starArray, setStarArray] = useState<JSX.Element[]>([]);

    const getMeteorShower = () => {
        return (<>
            <Box sx={{
                position: 'absolute', // means that it will stay put in its parents component
                width: '100vw', // alter if don't work
                height: '100vh', // alter if don't work
            }}>
                {starArray}
            </Box>
        </>)
    }

    useEffect(() => {
        setTimeout(() => {
            setStarArray([...starArray, getRandomShootingStar()]);
        }, 300)
    }, [starArray]);

    const firstPage = <Stack // Please fix overflow on mobile, they cant scroll!
        direction='column'
        justifyContent='space-between'
        alignItems={'center'}
        minHeight='100vh'
        width='100vw'
        sx={{
            overflowX: 'hidden',
            position: 'relative'
        }}
    >
        <Box sx={{
            position: 'absolute',
            width: '100vw',
            bottom: '0px'
        }}>
            <LinksDisplay />
        </Box>
        <Box sx={{
            position: 'absolute',
            bottom: '-1px',
            height: '2px',
            width: '100vw',
            backgroundColor: '#8C83A4', // This will fill in the gap between the two pages between the wave!
            overflowX: 'hidden',
        }} />
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
                padding: '10px',
                paddingLeft: '100px',
                paddingTop: '30px',
                paddingBottom: '20px',
                paddingRight: '30px',
            }}
        >
            <Box sx={{ opacity: 0 }}>
                {getLogo(30)}
            </Box>
            <DrawerButton />
        </Grid>

        <Grid item>
            <Stack
                direction='column'
                alignItems={'center'}
                justifyContent={'center'}
            >
                {getLogo(45)}
                {<Typography sx={{
                    color: 'white',
                    fontSize: '20px',
                }}>Welcome Click to Learn More!</Typography>}
                <Box style={{ height: '30vh', zIndex: 1 }}>

                </Box>
            </Stack>
        </Grid>
        <Grid item sx={{
            position: 'absolute',
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0, // Set margin to 0 to remove any default spacing
            padding: 0, // Set padding to 0 to remove any default padding
            zIndex: -2,
        }}>{getMeteorShower()}</Grid>
        <Grid item // important to use grid items if you want your animation to stay at the very bottom of the component
            sx={{
                position: 'relative',
                width: '100vw',

            }}
        >
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
            </Box >
        </Grid>
    </Stack>

    const [twinkleArray, setTwinkleArray] = useState<JSX.Element[]>([]);

    const getRandomTwinkle = (): JSX.Element => {

        const topOffset = getRandomNumber(10, 50);
        const leftOffset = getRandomNumber(5, 95);
        const randomDuration = getRandomNumber(6, 15);

        const randomHeadWidthPx = getRandomNumber(5, 10);
        const randomRotateAddDeviation = getRandomNumber(1, 180);


        return (<TwinklingStarsAnimation rotateAddDeviation={randomRotateAddDeviation} headWidthPx={randomHeadWidthPx} animationDuratonSecs={randomDuration} topOffsetVh={topOffset} leftOffsetVw={leftOffset} />);
    }

    const getTwinkles = () => {
        return (<>
            <Box sx={{
                position: 'absolute', // means that it will stay put in its parents component
                width: '100vw', // alter if don't work
                height: '100vh', // alter if don't work
            }}>
                {twinkleArray}
            </Box>
        </>)
    }

    useEffect(() => {
        setTimeout(() => {
            setTwinkleArray([...twinkleArray, getRandomTwinkle()]);
        }, 500)
    }, [twinkleArray]);

    /**
     * 
     *                 <Grid item sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100vw',
                        height: '100vh',
                        margin: 0, // Set margin to 0 to remove any default spacing
                        padding: 0, // Set padding to 0 to remove any default padding
                        zIndex: 2,
                    }}>{getTwinkles()}</Grid>
     */

    const secondPage =
        <Box sx={{
            background: 'linear-gradient(180deg, rgb(24, 18, 43) 0%, rgb(3, 24, 53) 20%, rgb(40, 45, 65) 60%, rgba(211, 140, 96, 0.3) 100%)',
            zIndex: 1,
            overflow: 'hidden', // this gets rid of the thing that fills in the gap between the two pages
        }}>
            <Stack sx={{
                minHeight: '110vh',
                width: '100vw',
                position: 'relative', // relative sets this as the parent container for the absolute positions box can be in
                overflow: 'hidden'
            }}>
                <Grid item sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0, // Set margin to 0 to remove any default spacing
                    padding: 0, // Set padding to 0 to remove any default padding
                    zIndex: 2,
                }}>{getTwinkles()}</Grid>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '0px',
                        width: '100vw',
                        zIndex: -1,
                        transform: 'rotate(180deg)'
                    }}
                >
                    {getWaveAnimation('10vh', 0.25, 'forwards', 8, OnePeakWaveSvg)}
                    {getWaveAnimation('15vh', 0.25, 'forwards', 5, TwoPeakWaveSvg)}
                    {getWaveAnimation('18vh', 0.25, 'backwards', 9, TwoPeakWaveSvg)}

                    {getWaveAnimation('20vh', 0.25, 'backwards', 11, OnePeakWaveSvg)}
                    {getWaveAnimation('15vh', 0.25, 'forwards', 8, TwoPeakWaveSvg)}
                    {getWaveAnimation('25vh', 0.25, 'forwards', 15, TwoPeakWaveSvg)}
                </Box >
                <Box sx={{
                    position: 'absolute',
                    top: '-1px',
                    height: '2px',
                    width: '100vw',
                    backgroundColor: '#8C83A4', // This will fill in the gap between the two pages between the wave!
                    overflowX: 'hidden',
                }} />
                {/**stack below causing double scroll bars */}
                <Stack
                    sx={{
                        position: 'absolute',
                        bottom: '0',
                    }}
                >
                    <Stack direction='row' sx={{
                        width: '100vw',
                        alignItems: 'flex-end',
                        justifyContent: 'space-between',
                    }}>
                        <Box width='10px'></Box>
                        <TentSvg width={"139px"} height={"79px"} opacity={1}></TentSvg>
                        <Box width='10px'></Box>
                        <Box sx={{
                            marginBottom: "-5px"
                        }}>
                            <Box sx={{ zIndex: -1, position: 'relative', }}> {/** Make it relative because zIndex only works with relative positions */}
                                <CampFireAnimation />
                            </Box>
                        </Box>
                        <MountainRocksSvg width={"85%"} height={"15vh"} opacity={1}></MountainRocksSvg>
                    </Stack>
                    <Box sx={{
                        width: "100vw",
                        height: "10vh"
                    }}>
                        <MountainBaseSvg width={"100%"} height={"10vh"} opacity={1}></MountainBaseSvg>
                    </Box>
                </Stack>
            </Stack>
        </Box>

    return (<>
        <Stack sx={{ overflowX: 'hidden', position: 'relative' }}>
            {firstPage}
            {secondPage}
        </Stack>
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