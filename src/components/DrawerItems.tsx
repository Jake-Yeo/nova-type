import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface prop {
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerItems = ({ setIsDrawerOpen }: prop) => {
    const navigate = useNavigate();

    const getStyledListButton = (text: String, route: string) => {
        return (<>
            <ListItemButton onClick={() => navigateTo(route)}>
                <ListItemText
                    primary={<span style={{
                        color: 'White'
                    }}>{text}</span>}>
                </ListItemText>
            </ListItemButton>
        </>)
    }

    const navigateTo = (route: string) => {
        navigate(route);
    }

    return (
        <>
            <Box sx={{ width: 250 }} onClick={(e) => setIsDrawerOpen(false)}>
                <List>
                    {getStyledListButton('Home', '/HomePage')}
                    {getStyledListButton('Typing Practice', '/TypingPage')}
                    {getStyledListButton('History', '/HistoryPage')}
                    {getStyledListButton('About', '/AboutPage')}
                </List>
            </Box>
        </>
    );
}

export default DrawerItems