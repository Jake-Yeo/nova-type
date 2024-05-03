import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface prop {
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DrawerItems = ({ setIsDrawerOpen }: prop) => {
    return (
        <>
            <Box sx={{ width: 250 }} role="presentation" onClick={(e) => setIsDrawerOpen(false)}>
                <List>

                </List>
            </Box>
        </>
    );
}

export default DrawerItems