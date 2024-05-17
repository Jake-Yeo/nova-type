import { Box, keyframes } from "@mui/material"
import CampFireSvg from "./CampFireSvg"
import { useEffect, useState } from "react";
import SmokeAnimation, { smokeProps } from "./SmokeAnimation";
import { getRandomNumber } from "../functions/HelperFunction";

const CampFireAnimation = () => {

    const [smokeArray, setSmokeArray] = useState<JSX.Element[]>([]);

    const getRandomSmokeAnimation = (): JSX.Element => {
        const smokeSettings: smokeProps = {
            translateXMultDeviation: getRandomNumber(-1, 1),
            translateYAddDeviation: getRandomNumber(-5, 0), // has to be negative
            blurAddDeviation: 0,
            widthAddDeviation: getRandomNumber(-10, 10),
            animationTimeDeviation: getRandomNumber(5, 10),
            scaleX: getRandomNumber(-2, 2),
            scaleY: getRandomNumber(-2, 2),
            rotationMultDeviation: getRandomNumber(-1, 1),
            opacityAddDeviation: getRandomNumber(0, 1)
        }
        return <SmokeAnimation {...smokeSettings}></SmokeAnimation>
    }

    useEffect(() => {
        setTimeout(() => {
            setSmokeArray([...smokeArray,
            getRandomSmokeAnimation()]);
        }, 200)
    }, [smokeArray]);

    return (<>
        <Box
            sx={{
                marginBottom: '-5px',
                width: 30,
                height: 50,
                // filter: 'blur(px)',
                position: 'relative',
                zIndex: 0,
            }}
        >
            <Box sx={{ position: 'absolute', top: '10px' }}>
                <img src='./svgFiles/flame.gif' alt="Your GIF" style={{ width: '100%', height: '100%', objectFit: 'cover', }} />
            </Box>
            <Box sx={{ position: 'absolute', width: '160px', height: '120px', backdropFilter: 'blur(5px)', marginLeft: '-45px', top: '-30px' }} />
            <Box sx={{ position: 'absolute', width: '160px', height: '120px', backdropFilter: 'blur(10px)', marginLeft: '-45px', top: '-30px' }} />
            <Box sx={{ position: 'absolute', width: '160px', height: '120px', backdropFilter: 'blur(20px)', marginLeft: '-45px', top: '-30px' }} />
            <Box sx={{ position: 'absolute', width: '160px', height: '120px', backdropFilter: 'blur(3px)', marginLeft: '-45px', top: '-30px' }} />
            {smokeArray}
            <Box sx={{ position: 'absolute', filter: 'blur(0.5px)', top: '10px' }}> {/** I like the flamed blurred a little */}
                <img src='./svgFiles/flame.gif' alt="Your GIF" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
        </Box>
        <Box sx={{ zIndex: 1, position: 'relative', mixBlendMode: 'overlay' }}> {/** Make it relative because zIndex only works with relative positions */}
            <CampFireSvg width={"35px"} height={"15px"} opacity={1}></CampFireSvg>
        </Box>
    </>)
}

export default CampFireAnimation
