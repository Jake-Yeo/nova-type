import { Button, Grid } from "@mui/material"
import { getSvgBox } from "../functions/HelperFunction"

const NightButton = () => {
    //{getSvgBox(40, 40, "./svgFiles/restart.svg")}
    return (
            <Button
              //  onClick={() => onClick()}
                sx={{
                    color: '#635985',
                    backgroundColor: '#292140',
                    borderRadius: '20px',
                    '&:hover': { //When you use &:hover, you’re saying: “Apply the following styles to the current selector when it’s being hovered.”
                        backgroundColor: '#393055',
                    },
                }}>
               
            </Button>
    )
}