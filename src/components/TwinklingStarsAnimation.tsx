
import { Box, css, keyframes } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { globalStyleId } from "../functions/HelperFunction";

interface ShootingStarsProps {
    headWidthPx: number,
    animationDuratonSecs: number,
    topOffsetVh: number,
    leftOffsetVw: number,
    rotateAddDeviation: number,
}

const TwinklingStarsAnimation = ({ headWidthPx, animationDuratonSecs, topOffsetVh, leftOffsetVw, rotateAddDeviation }: ShootingStarsProps) => {

    const animationPosId = uuidv4();
    const animationNegId = uuidv4();
    const cssPosId = uuidv4();
    const cssNegId = uuidv4();

    const boxWrapperId = uuidv4();



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
            transform: translate(${-headWidthAnimeAspect / 2}px) rotate(${45 + rotateAddDeviation}deg);
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

        id: ${animationNegId}

        globalId: ${globalStyleId}
        `;

    var headPosAnimation = keyframes`
        0% {
            transform: translate(0px) rotate(${-45 + rotateAddDeviation}deg);
            width: 0px;
        }
    
        30% {
            transform: translate(${-headWidthAnimeAspect / 2}px) rotate(${-45 + rotateAddDeviation}deg);
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

        id: ${animationPosId}

        globalId: ${globalStyleId}
        `;

    const starHeadNegCss = {
        globalId: globalStyleId,
        id: cssNegId,
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
        globalId: globalStyleId,
        id: cssPosId,
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

    const toDelete = useRef<HTMLElement>(null);

    const purgeStyles = () => {
        var styleTags = document.querySelectorAll('style[data-emotion="css"]');
        var styleTagsArray = Array.from(styleTags);
        var numTagsFound = 0;

        for (var i = styleTagsArray.length - 1; i >= 0; i--) {
            var styleTag = styleTags[i];

            if (styleTag.innerHTML.includes(animationPosId) || styleTag.innerHTML.includes(animationNegId) || styleTag.innerHTML.includes(cssNegId) || styleTag.innerHTML.includes(cssPosId) || styleTag.innerHTML.includes(boxWrapperId)) {
                numTagsFound++;
                // console.log(`Found animationPosId(Twinkling): ${animationPosId} or animationNegId(Twinkling): ${animationNegId} or cssNegId(Twinkling): ${cssNegId} or cssPosId(Twinkling): ${cssPosId} in a style tag, removing:", styleTag`);
                styleTag.remove();
            }

            // If both "animationId" and "cssId" are found, break out of the loop
            if (numTagsFound == 7) {// this number is based on me manuallly checking how many style elements are created per shooting star in the dom. (I originally thought it was 8!)
                break;
            }
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {

            purgeStyles(); // deletes all styles associated with this animation to prevent memory leaks

            toDelete.current?.remove(); // delete this element from the dom once the animation finishes!

        }, (animationDuratonSecs * 1000));

        return () => {

            clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds

            toDelete.current?.remove(); // delete this element from the dom once the animation finishes!
        };
    }, [])

    return (
        <Box
            ref={toDelete}
            sx={{
                globalId: globalStyleId,
                id: boxWrapperId,
                top: `${topOffsetVh}vh`,
                left: `${leftOffsetVw}vw`,
                position: 'absolute',
                zIndex: -11,
            }}
        >
            <Box sx={starHeadPosCss} /> {/** NEED REFS TO THIS TOO TO DELETE STYLE */}
            <Box sx={starHeadNegCss} /> {/** NEED REFS TO THIS TOO TO DELETE STYLE */}
        </Box>
    )
}

export default TwinklingStarsAnimation;