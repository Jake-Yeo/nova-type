import { useEffect } from "react";
import CampUnderTwilightBackground from "../components/CampUnderTwilightBackground"
import { purgeAllStylesWithGlobalId } from "../functions/HelperFunction";
import LogoNavBar from "../components/LogoNavBar";
import LinksDisplay from "../components/LinksDisplay";
import { Box, Stack, Typography } from "@mui/material";

const AboutPage = () => {

    useEffect(() => {
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
                        <Typography sx={{ width: '60vw', color: 'white', zIndex: 4, marginBottom: '20vh' }}>aweiofjawpefj
                            ipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            ipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfjipoaewfjipoae
                            wjfipoaejfp
                            oaewjfaewjfo
                            aewifjawipfj
                            aewifjawipfj
                            aewipfjeawoifjaiowfjawioefj</Typography>
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