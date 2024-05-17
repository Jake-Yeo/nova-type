import { Box, Grid, Stack } from "@mui/material"
import MountainBaseSvg from "./MountainBaseSvg"
import MountainRocksSvg from "./MountainRocksSvg"
import CampFireAnimation from "./CampFireAnimation"
import TentSvg from "./TentSvg"
import { ReactNode, useEffect, useState } from "react"
import { getRandomNumber } from "../functions/HelperFunction"
import TwinklingStarsAnimation from "./TwinklingStarsAnimation"
import CloudOceanAnimation from "./CloudOceanAnimation"

interface Props {
    children?: ReactNode // this allows us to pass in child elements like so <MeteorShowerCloudOceanBackground>hi there!</MeteorShowerCloudOceanBackground>
}


const CampUnderTwilightBackground = ({ children }: Props) => {

    const [twinkleArray, setTwinkleArray] = useState<JSX.Element[]>([]);

    const getRandomTwinkle = (): JSX.Element => {

        const topOffset = getRandomNumber(10, 88);
        const leftOffset = getRandomNumber(1, 99);
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

    return (
        <>
            <Box sx={{
                background: 'linear-gradient(180deg, rgb(24, 18, 43) 0%, rgb(3, 24, 53) 20%, rgb(40, 45, 65) 60%, rgba(211, 140, 96, 0.3) 100%)',
                zIndex: 1,
                overflow: 'hidden', // this gets rid of the thing that fills in the gap between the two pages
            }}>
                <Stack sx={{
                    minHeight: '100vh',
                    width: '100vw',
                    position: 'relative', // relative sets this as the parent container for the absolute positions box can be in
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {children}
                    {/**stack below causing double scroll bars */}
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '0px',
                            width: '100vw',
                            zIndex: 0,
                            transform: 'rotate(180deg)'
                        }}
                    >
                        <CloudOceanAnimation heightSubtraction={7}></CloudOceanAnimation>
                    </Box >
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
                            zIndex: '100'
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
                        <Box
                            sx={{
                                width: "100vw",
                                height: "10vh",
                                zIndex: 100,
                            }}>
                            <MountainBaseSvg width={"100%"} height={"10vh"} opacity={1}></MountainBaseSvg>
                        </Box>
                        <Grid item sx={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100vw',
                            height: '100vh',
                            margin: 0, // Set margin to 0 to remove any default spacing
                            padding: 0, // Set padding to 0 to remove any default padding
                            zIndex: 0,
                        }}>{getTwinkles()}</Grid>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default CampUnderTwilightBackground