import { Box, keyframes } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useEffect, useRef, useState } from "react";

interface ShootingStarsProps {
    headWidthPx: number,
    animationDuratonSecs: number,
    topOffsetVh: number,
    leftOffsetVw: number,
    rotateAddDeviation: number,
}

const TwinklingStarsAnimation = ({ headWidthPx, animationDuratonSecs, topOffsetVh, leftOffsetVw, rotateAddDeviation}: ShootingStarsProps) => {

    const starHeadCssWidth = headWidthPx;
    const starHeadCssHeight = starHeadCssWidth * (4 / 30);
    const starHeadCssTransform = starHeadCssWidth * (84 / 30);
    const headWidthAnimeAspect = starHeadCssWidth;

    const animationTime = animationDuratonSecs;

    var headNegAnimation = keyframes`
        0% {
            transform: translate(0px) rotate(${45 + rotateAddDeviation}deg);
            width: 0px;
            
        }
    
        30% {
            transform: translate(${-headWidthAnimeAspect/2}px) rotate(${45 + rotateAddDeviation}deg);
            width: ${headWidthAnimeAspect}px;
        }

        40% {
            filter: drop-shadow(0 0 2px white);
        }

        60% {
            filter: drop-shadow(0 0 13px white);
        }

        70% {
            filter: drop-shadow(0 0 6px white);
        }

        80% {
            filter: drop-shadow(0 0 3px white);
        }
    
        100% {
            transform: translate(0px) rotate(${45 + rotateAddDeviation}deg);
            width: 0px;
            filter: drop-shadow(0 0 20px white);
        }
        `;

    var headPosAnimation = keyframes`
        0% {
            transform: translate(0px) rotate(${-45 + rotateAddDeviation}deg);
            width: 0px;
        }
    
        30% {
            transform: translate(${-headWidthAnimeAspect/2}px) rotate(${-45 + rotateAddDeviation}deg);
            width: ${headWidthAnimeAspect}px;
        }

        40% {
            filter: drop-shadow(0 0 2px white);
        }

        60% {
            filter: drop-shadow(0 0 13px white);
        }

        70% {
            filter: drop-shadow(0 0 6px white);
        }

        80% {
            filter: drop-shadow(0 0 3px white);
        }
    
        100% {
            transform: translate(0px) rotate(${-45 + rotateAddDeviation}deg);
            width: 0px;
            filter: drop-shadow(0 0 20px white);
        }
        `;

    const starHeadNegCss = {
        position: 'absolute',
        width: `${starHeadCssWidth}px`,
        height: `${starHeadCssHeight}px`,
        background: 'linear-gradient(-45deg, rgba(0, 0, 255, 0), white, rgba(0, 0, 255, 0))',
        borderRadius: '100px',
        transform: `translate(${starHeadCssTransform}px) rotate(45deg)`,
        filter: 'drop-shadow(0 0 6px white)',
        zIndex: -10,
        animation: `${headNegAnimation} ${animationTime}s ease-in-out infinite`
    }

    const starHeadPosCss = {
        position: 'absolute',
        width: `${starHeadCssWidth}px`,
        height: `${starHeadCssHeight}px`,
        background: 'linear-gradient(-45deg, rgba(0, 0, 255, 0), white, rgba(0, 0, 255, 0))',
        borderRadius: '100px',
        transform: `translate(${starHeadCssTransform}px) rotate(-45deg)`,
        filter: 'drop-shadow(0 0 6px white)',
        zIndex: -10,
        animation: `${headPosAnimation} ${animationTime}s ease-in-out infinite`
    }

    // Timer to remove element from dom after animation finishes

    const [render, setRender] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setRender(false);
        }, (animationDuratonSecs * 1000));

        return () => {
            clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds
        };
    }, [])

    if (render) { // effectivly same as deleting element. If render if false, then the element dissapears from dom I'm pretty sure
        return (
            <Box
                sx={{
                    top: `${topOffsetVh}vh`,
                    left: `${leftOffsetVw}vw`,
                    position: 'absolute',
                    zIndex: -10,
                }}
            >
                <Box sx={starHeadPosCss} />
                <Box sx={starHeadNegCss} />
            </Box>
        )
    } else {
        return (<></>)
    }


}

export default TwinklingStarsAnimation;