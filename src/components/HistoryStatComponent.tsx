import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { currentUser } from "../objects/User";
import DynamicColorNumberDisplay from "./DynamicColorNumberDisplay";
import { getToTypeDisplayPublic } from "./ToTypeDisplay";
import { formatDurationFromMillis } from "./CurrDurationDisplay";
import { TypingStat } from "../objects/TypingStat";

interface props {
    index: number,
    width: number,
    fontSize: number,
}

const HistoryStatComponent = ({ index, width, fontSize }: props) => {// make sure to log the height of the component
    const typingStat = currentUser.getTypingStats().at(index);


    let wpmComponent: JSX.Element | null = null;
    let accuracyComponent: JSX.Element | null = null;
    let accuracyVisualization: JSX.Element | null = null;


    if (typingStat) {
        wpmComponent = <DynamicColorNumberDisplay stat={typingStat.getWpm()} statName={'WPM:'} color={'#9287B7'}></DynamicColorNumberDisplay>
        accuracyComponent = <DynamicColorNumberDisplay stat={typingStat.getAccuracy()} statName={'Accuracy:'} color={'#9287B7'}></DynamicColorNumberDisplay>
        accuracyVisualization = <>{getToTypeDisplayPublic(typingStat.getGeneratedPrompt(), typingStat.getTypedPrompt(), fontSize)}</>
    }

    const getDiv = () => {
        return (<>
            <div style={{ height: '15px' }}></div>
        </>)
    }

    const scrollableElement = (title: string, toScroll: JSX.Element) => {
        return (<>
            {wrapInBox(
                <>
                    <Typography sx={{
                        color: "white",
                        paddingTop: '20px',
                        paddingLeft: '20px',
                    }}>{title}</Typography>
                    <div className="scrollCss"
                        key='scrollPane'
                        contentEditable={false}
                        style={{
                            display: 'inline-block',
                            width: `calc(${width}vw - 100px)`, // + converts a data type object Number to primitive type number
                            overflow: 'hidden',
                            height: '150px',
                            borderRadius: '40px',
                            paddingLeft: '10px',
                            paddingRight: '10px',
                            paddingTop: '10px',
                            whiteSpace: 'normal', // Enable text wrap
                            wordWrap: 'break-word', // Allow breaking long words
                            overflowY: 'scroll' // Use camelCase for hyphenated CSS properties
                        }}>
                        {toScroll}
                    </div>
                    {getDiv()}
                </>
            )}
        </>)
    }

    const wrapInBox = (element: JSX.Element) => {

        return (
            <>
                <Box sx={{
                    width: `calc(${width}vw - 85px)`,
                    backgroundColor: '#18122B',
                    borderRadius: '40px',
                }}>
                    {element}
                </Box>
            </>)
    }


    const scrollableAccuracyVisualization = scrollableElement("Accuracy Visual", <>{accuracyVisualization}</>);

    const scrollableGeneratedPrompt = scrollableElement("Generated Prompt",
        <Typography sx={{
            fontSize: `${fontSize}px`,
            color: '#9287B7'
        }}>{typingStat?.getGeneratedPrompt()}</Typography>);

    const scrollableTypedPrompt = scrollableElement("User Results",
        <Typography sx={{
            fontSize: `${fontSize}px`,
            color: '#9287B7'
        }}>{typingStat?.getTypedPrompt()}</Typography>);

    if (typingStat?.getDuration()) {
        var duration = formatDurationFromMillis(+typingStat?.getDuration());
    }


    return (<>
        <Grid container
            alignItems={'center'}
            direction={'column'}
            sx={{
                backgroundColor: '#292140',
                borderRadius: '65px',
                paddingTop: '25px',
                paddingBottom: '25px',
                width: `calc(${width}vw - 50px)`,
            }}
        >
            <Typography sx={{ color: "#9287B7" }}>{"Test #" + (index + 1)}</Typography>
            <Stack flexDirection={"row"}>
                <Typography sx={{ color: "#9287B7" }}>Duration:&nbsp;</Typography>
                <Typography sx={{ color: "#B8AAE9" }}>{formatDurationFromMillis((typingStat as TypingStat).getDuration() ?? 0)}</Typography> {/**coallasing operator didn'y work for some reason */}
            </Stack>
            {wpmComponent}
            {accuracyComponent}
            {getDiv()}
            {scrollableGeneratedPrompt}
            {getDiv()}
            {scrollableTypedPrompt}
            {getDiv()}
            {scrollableAccuracyVisualization}
        </Grid>
    </>)
}

export default HistoryStatComponent;