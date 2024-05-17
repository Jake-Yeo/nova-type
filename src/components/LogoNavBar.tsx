import { Box, Button, ButtonBase, ButtonTypeMap, Drawer, Grid, Stack, Typography } from "@mui/material";
import { ClassNameConfigurator } from '@mui/base/utils';
import { useRef, useState } from "react";
import DrawerItems from "./DrawerItems";
import { getLogo, getSvgBox } from "../functions/HelperFunction";
import DrawerButton from "./DrawerButton";

interface Props {
    hideLogo?: boolean
}

const LogoNavBar = ({ hideLogo }: Props) => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    var logo = <Box sx={{ opacity: 1 }}>{getLogo(30)}</Box>

    if (!hideLogo) {
        hideLogo = false;
    }

    if (hideLogo == true) {
        logo = <Box sx={{ opacity: 0 }}>{getLogo(30)}</Box>
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