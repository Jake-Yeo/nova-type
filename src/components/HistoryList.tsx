//@ts-ignore
import { FixedSizeList } from 'react-window';
import { currentUser } from '../objects/User';
import { Box, ListItem, ListItemButton, ListItemText } from '@mui/material';
const HistoryList = () => {

    const ListItemComponent = () => (
        <ListItem key={1} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={`Item ${currentUser.getTypingStats.length}`} />
            </ListItemButton>
        </ListItem>
    );

    return (<>
        <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
        <FixedSizeList
            height={400}
            width={360}
            itemSize={46}
            itemCount={currentUser.getTypingStats.length}
            overscanCount={5}
        >
            {ListItemComponent}
        </FixedSizeList>
        <span style={{color: 'white'}}>{currentUser.getTypingStats.length}</span>
        </Box>
    </>)
}

export default HistoryList