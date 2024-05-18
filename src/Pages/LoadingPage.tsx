import { Box, Stack, Typography } from "@mui/material"

const LoadingPage = () => {

    const width = 65;
    const height = width * 1 / 2;

    return (<>
        <Stack justifyContent={'center'}
            alignItems={'center'}
            sx={{
                width: '100vw',
                height: '100vh',
            }}>
            <Typography color='white' fontSize={width}>Loading...</Typography>
            <Box
                sx={{
                    backgroundImage: 'url("./svgFiles/infinite-spinner.svg")', // Load background image
                    backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                    backgroundRepeat: 'no-repeat',
                    width: `${width}vw`, // Set the width of the container
                    height: `${height}vw` // Automatically adjust the height based on the aspect ratio
                }}
            />
        </Stack>
    </>)
}

export default LoadingPage