import { Box, css, keyframes } from "@mui/material"
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { globalStyleId } from "../functions/HelperFunction";

export interface smokeProps {
    translateXMultDeviation: number,
    translateYAddDeviation: number,
    blurAddDeviation: number,
    widthAddDeviation: number,
    animationTimeDeviation: number,
    scaleX: number,
    scaleY: number,
    rotationMultDeviation: number,
    opacityAddDeviation: number,
}

const SmokeAnimation = ({ translateXMultDeviation, translateYAddDeviation, blurAddDeviation, widthAddDeviation, animationTimeDeviation, scaleX, scaleY, rotationMultDeviation, opacityAddDeviation }: smokeProps) => {

    const animationTime = animationTimeDeviation;
    const animationId = uuidv4();
    const cssId = uuidv4();
    const smokeAnimation = keyframes`

    0% {
        transform: translateY(0vh) translateX(0px) rotate(${0 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${1 + blurAddDeviation}px);
        opacity: 0;
        width: ${30 + widthAddDeviation}px;
    }

    12.5% {
        transform: translateY(${-5 + translateYAddDeviation}vh) translateX(${-10 * translateXMultDeviation}px) rotate(${22.5 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${2 + blurAddDeviation}px);
        opacity: ${1 + opacityAddDeviation};
        width: ${35 + widthAddDeviation}px;
    }

    25% {
        transform: translateY(${-10 + translateYAddDeviation}vh) translateX(0px) rotate(${45 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${3 + blurAddDeviation}px);
        opacity: ${1 + opacityAddDeviation};
        width: ${40 + widthAddDeviation}px;
    }

    37.5% {
        transform: translateY(${-15 + translateYAddDeviation}vh) translateX(${20 * translateXMultDeviation}px) rotate(${67.5 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${3 + blurAddDeviation}px);
        opacity: ${1 + opacityAddDeviation};
        width: ${45 + widthAddDeviation}px;
    }

    50% {
        transform: translateY(${-20 + translateYAddDeviation}vh) translateX(0px) rotate(${90 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${3 + blurAddDeviation}px);
        opacity: ${1 + opacityAddDeviation};
        width: ${50 + widthAddDeviation}px;
    }

    62.5% {
        transform: translateY(${-25 + translateYAddDeviation}vh) translateX(${-30 * translateXMultDeviation}px) rotate(${112.5 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${4 + blurAddDeviation}px);
        opacity: ${1 + opacityAddDeviation};
        width: ${55 + widthAddDeviation}px;
    }

    75% {
        transform: translateY(${-30 + translateYAddDeviation}vh) translateX(0px) rotate(${135 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${6 + blurAddDeviation}px);
        opacity: ${1 + opacityAddDeviation};
        width: ${60 + widthAddDeviation}px;
    }

    87.5% {
        transform: translateY(${-35 + translateYAddDeviation}vh) translateX(${30 * translateXMultDeviation}px) rotate(${157.5 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${6 + blurAddDeviation}px);
        opacity: ${0.5 + opacityAddDeviation};
        width: ${65 + widthAddDeviation}px;
    }

    100% {
        transform: translateY(${-40 + translateYAddDeviation}vh)  translateX(0px) rotate(${180 * rotationMultDeviation}deg) scaleX(${scaleX}) scaleY(${scaleY}); 
        filter: blur(${20 + blurAddDeviation}px);
        opacity: 0;
        width: ${70 + widthAddDeviation}px;
    }

    id: ${animationId}

    globalId: ${globalStyleId}
    `
    const toDelete = useRef<HTMLElement>(null);

    const purgeStyles = () => {
        var styleTags = document.querySelectorAll('style[data-emotion="css"]');
        var styleTagsArray = Array.from(styleTags);
        var numTagsFound = 0;

        for (var i = styleTagsArray.length - 1; i >= 0; i--) {
            var styleTag = styleTags[i];

            if (styleTag.innerHTML.includes(cssId) || styleTag.innerHTML.includes(animationId)) {
                numTagsFound++;
                // console.log(`Found animationId(smoke): ${animationId} or cssId(smoke): ${cssId} in a style tag, removing:", styleTag`);
                styleTag.remove();
            }

            // If both "animationId" and "cssId" are found, break out of the loop
            if (numTagsFound == 3) {// this number is based on me manuallly checking how many style elements are created per shooting star in the dom. (I originally thought it was 8!)
                break;
            }
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {

            purgeStyles(); // delete all styles associated with this animation when it finishes

            toDelete.current?.remove(); // delete this element from the dom once the animation finishes!
        }, (animationTime * 1000));

        return () => {

            toDelete.current?.remove(); // delete this element from the dom once the animation finishes!

            clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds
        };
    }, [])

    return (
        <Box
            ref={toDelete}
            sx={{globalId: globalStyleId, id: cssId, position: 'absolute', zIndex: 2, width: '30px', height: '50px', marginLeft: '0px', top: '0px', animation: `${smokeAnimation} ${animationTime}s linear infinite`, animationFillMode: 'forwards', overflowY: 'hidden', }}
        > {/** smoke animation */}
            <img src='./svgFiles/smoke.png' alt="Your GIF" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
    )

}

export default SmokeAnimation