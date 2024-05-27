import { Box, Button, ButtonBase, ButtonTypeMap, Drawer, Grid, Stack, Typography } from "@mui/material";
import { ClassNameConfigurator } from '@mui/base/utils';
import { useEffect, useRef, useState } from "react";
import DrawerItems from "./DrawerItems";
import { getLogo, getSvgBox } from "../functions/HelperFunction";
import DrawerButton from "./DrawerButton";
import { useNavigate } from "react-router-dom";

interface Props {
    hideLogo?: boolean,
}

const LogoNavBar = ({ hideLogo = false }: Props) => {

    const navigate = useNavigate();

    var logo =
        <Button disableRipple
            sx={{
                textTransform: 'none', // for some reason text in button was all caps... This stops that!
                backgroundColor: 'transparent',
                '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                    backgroundColor: 'transparent',
                },
            }} onClick={() => {navigate('/HomePage')}}>
            <Box sx={{ opacity: 1 }}>{getLogo(1, 15)}</Box>
        </Button>

    if (hideLogo == true) {
        logo = <Box sx={{ opacity: 0 }}>{getLogo(1, 15)}</Box>
    }

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
            {logo}
            <DrawerButton />
        </Grid>
    </>);
}

export default LogoNavBar