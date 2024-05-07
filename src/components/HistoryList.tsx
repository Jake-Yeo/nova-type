//@ts-ignore
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { currentUser } from '../objects/User';
import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { TypingDataContext } from './TypeFeedAreaDisplay';
import { useContext, useReducer } from 'react';
import React from 'react';
const HistoryList = () => {

    const typingData = useContext(TypingDataContext);

    const [ignored, forceUpdate] = useReducer(x => x + 1, 0); // https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render

    const ListItemComponent = (props: ListChildComponentProps) => { // So how this works I think is that the FixSizeList will pass props into this automatically. The props contains an index, we can use this index to get the right stat.


        return (<ListItem key={1} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item ${currentUser.getTypingStats().at(props.index)?.getGeneratedPrompt()}`} />
            </ListItemButton>
        </ListItem>)
    };

    React.useEffect(() => { //https://stackoverflow.com/questions/46240647/how-to-force-a-functional-react-component-to-render
        forceUpdate();
    }, [typingData.toType]); // Update everytime toType changes (Usually toType changes when the user finishes typing the prompt, so this is a good way to update the history)

    return (<>
        <Box
            sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                height={400}
                width={360}
                itemSize={46}
                itemCount={currentUser.getTypingStats().length}
                overscanCount={5}
            >
                {ListItemComponent}
            </FixedSizeList>
        </Box>
    </>)
}

export default HistoryList