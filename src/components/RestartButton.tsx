import { Button, Grid } from "@mui/material"
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
                    Restart
                </Button>
            </Grid>
        </>
    )
}

export default RestartButton