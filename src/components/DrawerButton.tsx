import { Button, Drawer } from "@mui/material"
import { getSvgBox } from "../functions/HelperFunction"
import DrawerItems from "./DrawerItems"
import { useState } from "react";

const DrawerButton = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (<>
        <Button
            onClick={() => setIsDrawerOpen(true)}
            variant="contained"
            sx={{
                color: 'White',
                textEmphasisColor: '#292140',
                backgroundColor: '#635985',
                '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                    backgroundColor: '#9287B7',
                },
            }}
        >
            {getSvgBox(32, 32, "./svgFiles/menu.svg")}
        </Button>

        <Drawer
            anchor="right"
            open={isDrawerOpen}
            PaperProps={{ // This is the giving properties to the PaperProp that is used in the drawer (it's the part that slides out) read the documentation of the component apis to know which components makes up another component so you can add colour to those different parts
                sx: { backgroundColor: '#9287B7' },
            }}
            sx={{
                color: '#635985',
            }}
            onClose={() => setIsDrawerOpen(false)}>
            <DrawerItems setIsDrawerOpen={setIsDrawerOpen}></DrawerItems>
        </Drawer>
    </>)
}

export default DrawerButton