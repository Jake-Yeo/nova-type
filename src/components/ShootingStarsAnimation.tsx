import { Box, keyframes } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useEffect, useRef, useState } from "react";

interface ShootingStarsProps {
    headWidthPx: number,
    animationDuratonSecs: number,
    xyDistTravelVh: number,
    topOffsetVh: number,
    leftOffsetVw: number
}

const ShootingStarsAnimation = ({ headWidthPx, animationDuratonSecs, xyDistTravelVh, topOffsetVh, leftOffsetVw}: ShootingStarsProps) => {

    const starHeadCssWidth = headWidthPx;
    const starTailCssHeight = starHeadCssWidth * (4 / 30);
    const starHeadCssHeight = starHeadCssWidth * (4 / 30);
    const starHeadCssTransform = starHeadCssWidth * (84 / 30);
    const starTailCssWidth = starHeadCssWidth * (100 / 30);
    const headWidthAnimeAspect = starHeadCssWidth;
    const headTranslateAnimeAspect = starHeadCssWidth * (84 / 30);
    const tailWidthAnimeAspect = starHeadCssWidth * (100 / 30);

    const starTranslateAnimeAspect = xyDistTravelVh; // does not need to be part of the aspect ratio
    const animationTime = animationDuratonSecs;

    var headNegAnimation = keyframes`
        0% {
            transform: translate(0px) rotate(45deg);
            width: 0px;
        }
    
        30% {
            transform: translate(${headTranslateAnimeAspect}px) rotate(45deg);
            width: ${headWidthAnimeAspect}px;
        }
    
        100% {
            transform: translate(0px) rotate(45deg);
            width: 0px;
        }
        `;

    var headPosAnimation = keyframes`
        0% {
            transform: translate(0px) rotate(-45deg);
            width: 0px;
        }
    
        30% {
            transform: translate(${headTranslateAnimeAspect}px) rotate(-45deg);
            width: ${headWidthAnimeAspect}px;
        }
    
        100% {
            transform: translate(0px) rotate(-45deg);
            width: 0px;
        }
        `;

    var tailAnimation = keyframes`
        0% {
            width: 0px;
        }
    
        30% {
            width: ${tailWidthAnimeAspect}px;
        }
    
        100% {
            width: 0px;
        }
      `;

    var starAnimation = keyframes`
      0% {
        transform: translateX(0vh) translateY(0vh) rotate(45deg);
      }
      100% {
        transform: translateX(${starTranslateAnimeAspect}vh) translateY(${starTranslateAnimeAspect}vh) rotate(45deg);
      }
      `

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

    const starTailCss = {
        position: 'absolute',
        width: `${starTailCssWidth}px`,
        height: `${starTailCssHeight}px`,
        background: 'linear-gradient(-45deg, white, rgba(0, 0, 255, 0))',
        borderRadius: '100px',
        filter: 'drop-shadow(0 0 6px white)',
        zIndex: -10,
        animation: `${tailAnimation} ${animationTime}s ease-in-out infinite`
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
                    animation: `${starAnimation} ${animationTime}s ease-in-out infinite`,
                    zIndex: -10,
                }}
            >
                <Box sx={starTailCss} />
                <Box sx={starHeadPosCss} />
                <Box sx={starHeadNegCss} />
            </Box>
        )
    } else {
        return (<></>)
    }


}

export default ShootingStarsAnimation;