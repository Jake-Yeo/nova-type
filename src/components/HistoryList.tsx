//@ts-ignore
import { FixedSizeList, ListChildComponentProps, VariableSizeList } from 'react-window';
import { currentUser } from '../objects/User';
import { Box, Grid, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { TypingDataContext } from './TypeFeedAreaDisplay';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import React from 'react';
import DynamicColorNumberDisplay from './DynamicColorNumberDisplay';
import { getToTypeDisplayPublic } from './ToTypeDisplay';


const HistoryList = () => {


    const typingData = useContext(TypingDataContext);


    const [ignored, forceUpdate] = useReducer(x => x + 1, 0); // https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render


    const width = 85;

    const statComponentRefs: React.RefObject<HTMLDivElement>[] = [];

    const [statComponentHeights, setStatComponentHeights] = useState<number[]>([]);


    const getStatComponent = (statIndex: number) => { // make sure to log the height of the component
        const typingStat = currentUser.getTypingStats().at(statIndex);


        let wpmComponent: JSX.Element | null = null;
        let accuracyComponent: JSX.Element | null = null;
        let accuracyVisualization: JSX.Element | null = null;


        if (typingStat) {
            wpmComponent = <DynamicColorNumberDisplay stat={typingStat.getWpm()} statName={'WPM:'}></DynamicColorNumberDisplay>
            accuracyComponent = <DynamicColorNumberDisplay stat={typingStat.getAccuracy()} statName={'Accuracy:'}></DynamicColorNumberDisplay>
            accuracyVisualization = <>{getToTypeDisplayPublic(typingStat.getGeneratedPrompt(), typingStat.getTypedPrompt())}</>
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


    // !!! When using React-Window components don't forget to pass in the props.style!! https://stackoverflow.com/questions/56737563/react-window-and-infinite-loader-scrolling-issue
    const ListItemComponent = (props: ListChildComponentProps) => { // So how this works I think is that the FixSizeList will pass props into this automatically. The props contains an index, we can use this index to get the right stat.

        const licRef = useRef<HTMLDivElement>(null);


        const listItem = (
            // So because the div takes on the style of the prop, we don't know what its height is styled to, so we useRef on the ListItem instead to get the height
            <div style={props.style}> 
                <ListItem ref={licRef} onClick={(e) => (console.log(licRef.current?.clientHeight))} key={props.index} component="div" disablePadding>
                    <ListItemText primary={getStatComponent(props.index)} />
                </ListItem>
            </div>)

        statComponentRefs.push(licRef);

        return (listItem);
    };


    const getSizeOfComponentAtIndex = (index: number) => {
        console.log('Returned height', statComponentHeights.at(index));
        return statComponentHeights.at(index) ?? 0;
    }


    React.useEffect(() => { //https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
        forceUpdate();
        console.log('forced update');
        console.log('useeffect get height',statComponentRefs.at(0)?.current?.clientHeight);

        const newStatComponentHeights = [];

        for (const ref of statComponentRefs) {
            console.log('height in for loop', ref.current?.clientHeight ?? 0);
            newStatComponentHeights.push(ref.current?.clientHeight ?? 0); // use coalesing operator, if the left side of ?? is undefined, then return a height of 0
        }

        setStatComponentHeights(newStatComponentHeights);

    }, [typingData.toType]); // Update everytime toType changes (Usually toType changes when the user finishes typing the prompt, so this is a good way to update the history)

    return (<>
        <Box
            sx={{ width: `${width}vw`, height: 400, bgcolor: 'background.paper' }}
        >
            <VariableSizeList
                height={400}
                width={`${width}vw`}
                itemSize={(index: number) => getSizeOfComponentAtIndex(index)}
                itemCount={currentUser.getTypingStats().length}
                overscanCount={5}
            >
                {ListItemComponent}
            </VariableSizeList >
        </Box>
    </>)
}


export default HistoryList