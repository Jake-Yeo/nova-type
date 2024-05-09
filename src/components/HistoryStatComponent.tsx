import { Grid } from "@mui/material";
import { currentUser } from "../objects/User";
import DynamicColorNumberDisplay from "./DynamicColorNumberDisplay";
import { getToTypeDisplayPublic } from "./ToTypeDisplay";

interface props {
    index: number,
    width: number,
    fontSize: number,
}

const HistoryStatComponent = ({index, width, fontSize}: props) => {// make sure to log the height of the component
        const typingStat = currentUser.getTypingStats().at(index);


        let wpmComponent: JSX.Element | null = null;
        let accuracyComponent: JSX.Element | null = null;
        let accuracyVisualization: JSX.Element | null = null;


        if (typingStat) {
            wpmComponent = <DynamicColorNumberDisplay stat={typingStat.getWpm()} statName={'WPM:'}></DynamicColorNumberDisplay>
            accuracyComponent = <DynamicColorNumberDisplay stat={typingStat.getAccuracy()} statName={'Accuracy:'}></DynamicColorNumberDisplay>
            accuracyVisualization = <>{getToTypeDisplayPublic(typingStat.getGeneratedPrompt(), typingStat.getTypedPrompt(), fontSize)}</>
        }


        const scrollableAccuracyVisualization = <div className="scrollCss"
            key='scrollPane'
            contentEditable={false}
            style={{
                display: 'inline-block',
                width: `${width}vw`, // + converts a data type object Number to primitive type number
                overflow: 'hidden',
                whiteSpace: 'normal', // Enable text wrap
                wordWrap: 'break-word', // Allow breaking long words
                overflowY: 'scroll' // Use camelCase for hyphenated CSS properties
            }}>
            {accuracyVisualization}
        </div>


        return (<>
            <Grid container
                alignItems={'flex-start'}
                direction={'column'}
            >
                {wpmComponent}
                {accuracyComponent}
                {scrollableAccuracyVisualization}
            </Grid>
        </>)
} 

export default HistoryStatComponent;