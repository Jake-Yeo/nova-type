import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { getRandomShootingStar } from "../functions/HelperFunction";

interface Props {
    shootingStarInterval?: number
}

const MeteorShowerAnimation = ({shootingStarInterval = 300}: Props) => { // sets the default value to 300

    const [starArray, setStarArray] = useState<JSX.Element[]>([]);

    const getMeteorShower = () => {
        return (<>
            <Box sx={{
                position: 'absolute', // means that it will stay put in its parents component
                width: '100vw', // alter if don't work
                height: '100vh', // alter if don't work
            }}>
                {starArray}
            </Box>
        </>)
    }

    useEffect(() => {
        setTimeout(() => {
            setStarArray([...starArray, getRandomShootingStar()]);
        }, shootingStarInterval)
    }, [starArray]);

    return (<>
        <Grid item sx={{
            position: 'absolute',
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0, // Set margin to 0 to remove any default spacing
            padding: 0, // Set padding to 0 to remove any default padding
            zIndex: -2,
        }}>{getMeteorShower()}</Grid>
    </>)
}

export default MeteorShowerAnimation