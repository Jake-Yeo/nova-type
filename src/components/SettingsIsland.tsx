import { Paper } from "@mui/material"

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
                    maxWidth: '65vw',
                    backgroundColor: '#292140'
                }}>
                <span style={{
                    color: '#635985',
                    padding: '10px'
                }}>Settings, font size, amount of text to show, numbers, quotes, words, symbols</span>
            </Paper>
        </>
    )
}

export default SettingsIsland