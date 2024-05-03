import { Box, Button, ButtonBase, ButtonTypeMap, Drawer, Grid } from "@mui/material";
import { ClassNameConfigurator } from '@mui/base/utils';
import { useRef, useState } from "react";

const widthOfLogo = 200;
const heightOfLogo = widthOfLogo * 0.348;

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
            }}
        >
            <Box
                sx={{
                    backgroundImage: 'url("./svgFiles/TypeRunnerLogo(W317H110p5).svg")', // Load background image
                    backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                    backgroundRepeat: 'no-repeat',
                    width: widthOfLogo, // Set the width of the container
                    height: heightOfLogo // Automatically adjust the height based on the aspect ratio
                }}
            />

            <Button
                onClick={() => setIsDrawerOpen(true)}
                variant="contained"
                color="success"
                sx={{
                    color: '#292140',
                    textEmphasisColor: '#292140',
                    backgroundColor: '#635985',
                    '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                        backgroundColor: '#9287B7',
                      },
                }}
            >Menu</Button>

            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                "test"
            </Drawer>
        </Grid>
    </>);
}

export default LogoNavBar