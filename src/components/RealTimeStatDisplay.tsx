import { Grid } from "@mui/material"
import WpmDisplay from "./WpmDisplay"
import AccuracyDisplay from "./AccuracyDisplay"
import CurrDuratiionDisplay from "./CurrDurationDisplay"
import { TypingDataContext } from "./TypeFeedAreaDisplay"
import { useContext } from "react"

const RealTimeStatDisplay = () => {

    const typingData = useContext(TypingDataContext);

    return (
        <>
            <Grid container
                justifyContent='space-between'
                sx={{
                    width: +typingData.scrollPaneWidth
                }}>
                <WpmDisplay></WpmDisplay>
                <CurrDuratiionDisplay></CurrDuratiionDisplay>
                <AccuracyDisplay></AccuracyDisplay>
            </Grid>
        </>
    )
}

export default RealTimeStatDisplay