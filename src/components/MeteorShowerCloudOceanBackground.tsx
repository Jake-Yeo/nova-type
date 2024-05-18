
import MeteorShowerAnimation from "./MeteorShowerAnimation"
import CloudOceanAnimation from "./CloudOceanAnimation"
import { Box, Stack } from "@mui/material"
import { ReactNode } from "react"


interface Props {
    children?: ReactNode,
}

const MeteorShowerCloudOceanBackground = ({children}: Props) => { // this allows us to pass in child elements like so <MeteorShowerCloudOceanBackground>hi there!</MeteorShowerCloudOceanBackground>

    return (
        <Stack // Please fix overflow on mobile, they cant scroll!
            direction='column'
            justifyContent='space-between'
            alignItems={'center'}
            minHeight='100vh'
            width='100vw'
            sx={{
                overflowX: 'hidden',
                position: 'relative'
            }}
        >
            {children}
            <MeteorShowerAnimation />
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100vw',
                    height: '100vh',
                    margin: 0, // Set margin to 0 to remove any default spacing
                    padding: 0, // Set padding to 0 to remove any default padding
                    zIndex: -1,
                }}
            >
                <CloudOceanAnimation></CloudOceanAnimation>
            </Box >
        </Stack>
    )
}

export default MeteorShowerCloudOceanBackground