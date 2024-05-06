import { Grid } from "@mui/material"
import LogoNavBar from "../components/LogoNavBar"
import SettingsIsland from "../components/SettingsIsland"
import TypeFeedAreaDisplay from "../components/TypeFeedAreaDisplay"
import LinksDisplay from "../components/LinksDisplay"

const TypingPage = () => {
    return (<>
        <Grid
        container
        direction='column'
        justifyContent='space-between'
        height='100vh'
        >
            <Grid
                container
                direction='column'
                justifyContent='space-between'
            >
                <LogoNavBar></LogoNavBar>
                <TypeFeedAreaDisplay></TypeFeedAreaDisplay>
            </Grid>
            <LinksDisplay></LinksDisplay>
        </Grid>
    </>)
}

export default TypingPage