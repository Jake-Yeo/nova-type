import { useEffect } from "react";
import CampUnderTwilightBackground from "../components/CampUnderTwilightBackground"
import { purgeAllStylesWithGlobalId } from "../functions/HelperFunction";
import LogoNavBar from "../components/LogoNavBar";
import LinksDisplay from "../components/LinksDisplay";
import { Box, Stack } from "@mui/material";

const AboutPage = () => {

    useEffect(() => {
        return (() => {
            purgeAllStylesWithGlobalId(); // basically remove all style elements relating to the animations which were generating (although styles dissapear when the timer ends, if the page switches before the timer ends, then the style will not be deleted)
        })
    }, [])

    return (<>
        <CampUnderTwilightBackground occasionalShootingStar={true}>
            <Box sx={{ height: '100vh', width: '100vw', zIndex: 3 }}>
                <LogoNavBar hideLogo={true} />
                <Box style={{ height: '10vh' }} />

            </Box>
            <Box sx={{ position: 'absolute', zIndex: 1000, bottom: 0, width: '100vw' }}>
                <LinksDisplay darkMode={true}/>
            </Box>
        </CampUnderTwilightBackground>
    </>)
}

export default AboutPage