//@ts-ignore
import { FixedSizeList, ListChildComponentProps, VariableSizeList } from 'react-window';
import { currentUser } from '../objects/User';
import { Box, Button, Grid, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { TypingDataContext } from './TypeFeedAreaDisplay';
import { useCallback, useContext, useEffect, useReducer, useRef, useState } from 'react';
import React from 'react';
import DynamicColorNumberDisplay from './DynamicColorNumberDisplay';
import HistoryStatComponent from './HistoryStatComponent';
import HistoryListFontSlider from './HistoryListFontSlider';




// Sandbox below to help you understand how to deal with dynamic component heights
//https://codesandbox.io/p/sandbox/react-window-dynamic-row-height-8ftbq?file=%2Fsrc%2FApp.js%3A37%2C10
//https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
// !!! When using React-Window components don't forget to pass in the props.style!! https://stackoverflow.com/questions/56737563/react-window-and-infinite-loader-scrolling-issue




//https://codesandbox.io/p/sandbox/react-window-dynamic-row-height-8ftbq?file=%2Fsrc%2FApp.js%3A37%2C10
// THIS Code is largely modeled off of the sandbox above. Tbh I'm not too sure how this code works
// I beleive that when the index or add size function is changed, it calls the addSize function which is able to access the listRef. Then we are able to add the heights to the arry
// In the addSize function, it also calls listRef.current?.resetAfterIndex(index); which is effectively just a force re-render of this component


const width = 85;


var listItemComponentSize: number[] = [];
var listItemComponentRefs: React.RefObject<HTMLDivElement>[] = [];


interface ListItemComponentPropsExtended extends ListChildComponentProps {
    addSize: (height: number, index: number) => void;
    fontSize: number;
}


// !!! When using React-Window components don't forget to pass in the props.style!! https://stackoverflow.com/questions/56737563/react-window-and-infinite-loader-scrolling-issue
const ListItemComponent = ({ index, style, addSize, fontSize }: ListItemComponentPropsExtended) => { // So how this works I think is that the FixSizeList will pass props into this automatically. The props contains an index, we can use this index to get the right stat.
    const licRef = useRef<HTMLDivElement>(null);

    const listItem = (
        // So because the div takes on the style of the prop, we don't know what its height is styled to, so we useRef on the ListItem instead to get the height
        <div style={style}>
            <ListItem ref={licRef} onClick={(e) => (console.log(licRef.current?.clientHeight))} key={index} component="div" disablePadding>
                <ListItemText primary={<HistoryStatComponent index={index} width={width} fontSize={fontSize} />} />
            </ListItem>
        </div>)


    listItemComponentRefs.push(licRef);


    React.useEffect(() => {
        addSize(licRef.current?.clientHeight ?? 0, index);
    }, [addSize, index]);


    return (listItem);
};




const HistoryList = () => {


    //const [ignored, forceUpdate] = useReducer(x => x + 1, 0); // https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render


    const [fontSize, setFontSize] = useState(currentUser.getHistorySettings().getFontSize());


    const listRef = useRef<VariableSizeList>(null);


    const addSize = (height: number, index: number) => { // This will be called by the ListItemComponent function when index or addSize change state. They change state after they mount I beleive which is why this works. In previous versions all our attemps called or tried to re-render befor the components mounted! That is why we were getting undefined heights!
        listItemComponentSize.push(height); // We add height to the listItemComponentSize array
        listRef.current?.resetAfterIndex(index); // Effectivly just a re-render
    }


    const getSize = (index: number) => {
        return listItemComponentSize.at(index) || 0; // This is the getSize function
    };

    return (<>
        <Box
            sx={{
                width: `${width}vw`,
                height: '50vh',
                '&::-webkit-scrollbar-button': {
                    display: 'none', // Hide scrollbar arrows in WebKit browsers
                },
            }}
        >
            <VariableSizeList
                ref={listRef}
                height={400}
                width={`${width}vw`}
                itemSize={(index: number) => getSize(index)}
                itemCount={currentUser.getTypingStats().length}
                overscanCount={5}
                style={{
                    overflowY: 'scroll',
                    overflowX: 'hidden',
                    scrollbarWidth: 'initial', // For Firefox
                    scrollbarColor: '#B6AAD7 transparent', // For Firefox
                    msScrollbarArrowColor: "transparent",
                }}
            >
                {({ index, style }) => (    
                    <ListItemComponent index={index} style={{
                        ...style,
                        paddingRight: '200px',
                    }} data={undefined} addSize={addSize} fontSize={fontSize}></ListItemComponent>
                )}
            </VariableSizeList >
            <HistoryListFontSlider setFontSize={setFontSize}></HistoryListFontSlider>
        </Box >
        
    </>)
}




export default HistoryList
