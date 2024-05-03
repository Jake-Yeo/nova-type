import { Grid } from "@mui/material"
import LogoNavBar from "../components/LogoNavBar"
import SettingsIsland from "../components/SettingsIsland"
import TypeFeedAreaDisplay from "../components/TypeFeedAreaDisplay"

const TypingPage = () => {
    return (<>
        <Grid
        container
        justifyContent='center'
        >
            <LogoNavBar></LogoNavBar>
            <SettingsIsland></SettingsIsland>
            <TypeFeedAreaDisplay></TypeFeedAreaDisplay>
        </Grid>
    </>)
}

export default TypingPage