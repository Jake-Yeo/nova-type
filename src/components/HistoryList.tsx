//@ts-ignore
import { FixedSizeList, ListChildComponentProps, VariableSizeList } from 'react-window';
import { currentUser } from '../objects/User';
import { Box, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { TypingDataContext } from './TypeFeedAreaDisplay';
import { useContext, useReducer } from 'react';
import React from 'react';
const HistoryList = () => {

    const typingData = useContext(TypingDataContext);

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0); // https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render

    // !!! When using React-Window components don't forget to pass in the props.style!! https://stackoverflow.com/questions/56737563/react-window-and-infinite-loader-scrolling-issue
    const ListItemComponent = (props: ListChildComponentProps) => { // So how this works I think is that the FixSizeList will pass props into this automatically. The props contains an index, we can use this index to get the right stat.

        return (
            <div style={props.style}>
                <ListItem key={props.index} component="div" disablePadding>
                     <ListItemText primary={`Item ${currentUser.getTypingStats().at(props.index)?.getGeneratedPrompt()}`} />
                </ListItem>
            </div>)
    };

    const getSizeOfComponentAtIndex = (index: number) => {
        return 300;
    }

    React.useEffect(() => { //https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
        forceUpdate();
    }, [typingData.toType]); // Update everytime toType changes (Usually toType changes when the user finishes typing the prompt, so this is a good way to update the history)

    return (<>
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
        >
            <VariableSizeList 
                height={400}
                width={360}
                itemSize={getSizeOfComponentAtIndex}
                itemCount={currentUser.getTypingStats().length}
                overscanCount={5}
            >
                {ListItemComponent}
            </VariableSizeList >
        </Box>
    </>)
}

export default HistoryList