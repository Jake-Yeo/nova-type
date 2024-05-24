import { ReactElement, useEffect, useState } from "react";
import CampUnderTwilightBackground from "../components/CampUnderTwilightBackground"
import { purgeAllStylesWithGlobalId } from "../functions/HelperFunction";
import LogoNavBar from "../components/LogoNavBar";
import LinksDisplay from "../components/LinksDisplay";
import { Box, Stack, Typography } from "@mui/material";

async function parseAboutTxt() {

    const title = '<Title>';
    const paragraph = '<Paragraph>'
    var wrapper = '';

    const arrayOfElements: ReactElement[] = [];
    const response = await fetch('/constants/about.txt'); // this gets the response (probably in like a json format)
    var aboutText: String = await response.text(); // Then you need to get the text from the response
    var sentences: String[] = aboutText.split("\n");

    var sentencesToWrap = "";
    function wrap() {
        if (wrapper == title) {
            return <>
                <Typography sx={{ fontSize: '25px', textDecoration: 'underline' }}>{sentencesToWrap}</Typography>
                <Typography sx={{fontSize: '5px'}}>{'\u00A0'}</Typography>
            </>;
        }
        if (wrapper == paragraph) {
            return <>
                <Typography>{sentencesToWrap}</Typography>
                <Typography>{'\u00A0'}</Typography>
            </>;
        }
        return <></>;
    }

    for (let sentence of sentences) {

        if (sentence.includes('<')) {

            if (wrapper !== '') {
                arrayOfElements.push(wrap());
                sentencesToWrap = "";
            }

            wrapper = sentence.trim();
        } else {
            sentencesToWrap += sentence.trim() + " ";
        }
    }

    return (<>{arrayOfElements}</>);
}

const AboutPage = () => {

    const [aboutContext, setAboutContext] = useState(<></>);

    useEffect(() => {

        async function runAsync() {
            setAboutContext(await parseAboutTxt());// pretty sure this is the only way to call an async function in a component
        }

        runAsync();

        return (() => {
            purgeAllStylesWithGlobalId(); // basically remove all style elements relating to the animations which were generating (although styles dissapear when the timer ends, if the page switches before the timer ends, then the style will not be deleted)
        })
    }, [])

    return (<>
        <Stack>
            <Box sx={{ position: 'fixed', zIndex: 3 }}> {/** Make it fixed because I want the text to scroll up and above from the ground */}
                <CampUnderTwilightBackground occasionalShootingStar={true} >
                    <Box sx={{
                        height: '100vh',
                        width: '100vw',
                        overflowY: 'auto',
                        zIndex: 1,
                        justifyContent: 'center',
                        display: 'flex',
                        scrollbarWidth: 'initial', // For Firefox
                        scrollbarColor: '#B6AAD7 transparent', // For Firefox
                        msScrollbarArrowColor: "transparent",
                    }}>
                        <Box sx={{ width: '60vw', color: 'white', zIndex: 4, marginTop: '20vh' }}>
                            {aboutContext}
                            <Box sx={{ height: '20vh' }}></Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100vw', zIndex: 3, position: 'absolute', top: 0 }}>
                        <LogoNavBar hideLogo={true} />
                        <Box style={{ height: '10vh' }} />
                    </Box>
                </CampUnderTwilightBackground>
            </Box>
            <Box sx={{ position: 'fixed', zIndex: 1000, bottom: 0, width: '100vw' }}>
                <LinksDisplay darkMode={true} />
            </Box>
        </Stack>
    </>)
}

export default AboutPage