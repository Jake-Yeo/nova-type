import { Grid } from "@mui/material"
import CurrDuratiionDisplay from "./CurrDurationDisplay"
import { TypingDataContext } from "./TypeFeedAreaDisplay"
import { useContext } from "react"
import DynamicColorNumberDisplay from "./DynamicColorNumberDisplay"

const RealTimeStatDisplay = () => {

    const typingData = useContext(TypingDataContext);

    return (
        <>
            <Grid container
                justifyContent='space-between'
                sx={{
                    width: `${+typingData.scrollPaneWidth}vw`
                }}>
                <DynamicColorNumberDisplay stat={typingData.wpm} statName={'WPM:'}></DynamicColorNumberDisplay>
                <DynamicColorNumberDisplay stat={typingData.accuracy} statName={'Accuracy:'}></DynamicColorNumberDisplay>
                <CurrDuratiionDisplay></CurrDuratiionDisplay>
            </Grid>
        </>
    )
}

export default RealTimeStatDisplay