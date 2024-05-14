import { Box, Button, ButtonBase, ButtonTypeMap, Drawer, Grid, Stack, Typography } from "@mui/material";
import { ClassNameConfigurator } from '@mui/base/utils';
import { useRef, useState } from "react";
import DrawerItems from "./DrawerItems";
import { getLogo, getSvgBox } from "../functions/HelperFunction";
import DrawerButton from "./DrawerButton";

const LogoNavBar = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    return (<>
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
                padding: '10px',
                paddingLeft: '100px',
                paddingTop: '30px',
                paddingBottom: '20px',
                paddingRight: '30px'
            }}
        >
            {getLogo(30)}
            <DrawerButton/>
        </Grid>
    </>);
}

export default LogoNavBar