import { Box, Button, Grid } from "@mui/material"
import { restartPractice, setFocusToTypingArea } from "./TypingArea"


const RestartButton = () => {

    const onClick = () => {
        restartPractice();
        setFocusToTypingArea();
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent='center'
                sx={{
                    padding: '20px'
                }}
            >
                <Button
                    onClick={() => onClick()}
                    sx={{
                        color: '#635985',
                        backgroundColor: '#292140',
                        borderRadius: '20px',
                        '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                            backgroundColor: '#393055',
                        },
                    }}>
                    <Box
                        sx={{
                            backgroundImage: 'url("./svgFiles/restart.svg")', // Load background image
                            backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                            backgroundRepeat: 'no-repeat',
                            width: '40px', // Set the width of the container
                            height: '40px' // Automatically adjust the height based on the aspect ratio
                        }}
                    ></Box>
                </Button>
            </Grid>
        </>
    )
}

export default RestartButton