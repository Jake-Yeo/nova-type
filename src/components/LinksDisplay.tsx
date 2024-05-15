import { Box, Link } from "@mui/material"
import { getSvgBox } from "../functions/HelperFunction"

const LinksDisplay = () => {

    return (<>
        <Box
            sx={{
                display: 'inline-block',
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
                {getSvgBox(30, 30, "./svgFiles/githubColor.svg")}
                {'\u00A0GitHub'}
            </Link>
        </Box>
    </>)
}

export default LinksDisplay