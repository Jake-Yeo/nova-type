import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSvgBox } from "../functions/HelperFunction";

interface prop {
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerItems = ({ setIsDrawerOpen }: prop) => {
    const navigate = useNavigate();

    const getStyledListButton = (text: String, route: string, iconPath: string) => {
        return (<>
            <ListItemButton onClick={() => navigateTo(route)}>
                {getSvgBox('32px', '32px', iconPath)}
                <ListItemText
                    primary={<span style={{
                        color: 'White',
                        marginLeft: '10px',
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
                    {getStyledListButton('Home', '/HomePage', './svgFiles/home.svg')}
                    {getStyledListButton('Typing Practice', '/TypingPage', './svgFiles/keyboard.svg')}
                    {getStyledListButton('History', '/HistoryPage', './svgFiles/history.svg')}
                    {getStyledListButton('Login Signup', '/SignupLoginPage', './svgFiles/account.svg')}
                    {getStyledListButton('About', '/AboutPage', './svgFiles/information.svg')}
                </List>
            </Box>
        </>
    );
}

export default DrawerItems