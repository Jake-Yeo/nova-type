import { Grid, Stack } from "@mui/material"
import LogoNavBar from "../components/LogoNavBar"
import SettingsIsland from "../components/SettingsIsland"
import TypeFeedAreaDisplay from "../components/TypeFeedAreaDisplay"
import LinksDisplay from "../components/LinksDisplay"

const TypingPage = () => {
    return (<>
        <Stack
            direction='column'
            justifyContent='space-between'
            height='100vh'
            width='100vw'
        >
            <Grid
                container
                direction='column'
                justifyContent='space-between'
                width='100vw'
            >
                <LogoNavBar></LogoNavBar>
                <TypeFeedAreaDisplay></TypeFeedAreaDisplay>

            </Grid>
            <Grid item>
                <LinksDisplay></LinksDisplay>
            </Grid>
        </Stack>
    </>)
}

export default TypingPage