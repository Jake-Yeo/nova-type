import { Button, Grid } from "@mui/material"
import { restartPractice } from "./TypingArea"


const RestartButton = () => {

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent='center'
            >
                <Button
                    onClick={() => restartPractice()}
                    sx={{
                        color: '#635985',
                        backgroundColor: '#292140',
                        borderRadius: '20px',
                        '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                            backgroundColor: '#393055',
                        },
                    }}>
                    Reset
                </Button>
            </Grid>
        </>
    )
}

export default RestartButton