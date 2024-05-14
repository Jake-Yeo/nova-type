import { Box, Link } from "@mui/material"

const LinksDisplay = () => {

    return (<>
        <Box
            sx={{
                display: 'inline-block'
            }}>
            <Link
                href="https://github.com/Jake-Yeo/type-runner"
                underline="none"
                sx={{
                    paddingLeft: '10px',
                    paddingBottom: '10px',
                    color: '#18122B',
                    flex: '1',
                    display: 'flex',
                    width: 'fit-content',
                    alignItems: 'center',
                    flexDirection: 'row',
                    '&:hover': {
                        color: 'white',
                    }
                }}
            >
                <Box
                    sx={{
                        backgroundImage: 'url("./svgFiles/githubColor.svg")', // Load background image
                        backgroundSize: 'contain', // Scale the background image to fit within the container while preserving its aspect ratio
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#18122B',
                        borderRadius: '15px',
                        width: '30px', // Set the width of the container
                        height: '30px' // Automatically adjust the height based on the aspect ratio
                    }}
                ></Box>
                {'\u00A0GitHub'}
            </Link>
        </Box>
    </>)
}

export default LinksDisplay