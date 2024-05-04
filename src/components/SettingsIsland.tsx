import { Paper } from "@mui/material"
import FontSlider from "./FontSlider"

const SettingsIsland = () => {
    return (
        <>
            <Paper
                variant="elevation"
                elevation={3}
                square={false}
                sx={{
                    borderRadius: '20px',
                    minHeight: '50px', // get rid of this later on, this is just to add size to the paper
                    height: 'fit-content', // don't actually know if this works
                    display: 'inline-block',
                    width: '65vw',
                    backgroundColor: '#292140'
                }}>
                <span style={{
                    color: '#635985',
                    padding: '10px'
                }}>
                    <FontSlider></FontSlider>
                </span>
            </Paper>
        </>
    )
}

export default SettingsIsland