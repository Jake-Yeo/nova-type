import { Box, Link } from "@mui/material"
import { getSvgBox } from "../functions/HelperFunction"

interface Props {
    darkMode?: boolean
}

const LinksDisplay = ({darkMode = false}: Props) => {

    var noHoverTextColor = "#18122B";

    if (darkMode) {
        noHoverTextColor = '#8C83A4'
    }

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
                    color: noHoverTextColor,
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
                {getSvgBox('30px', '30px', "./svgFiles/githubColor.svg")}
                {'\u00A0GitHub'}
            </Link>
        </Box>
    </>)
}

export default LinksDisplay