import { Box, Link, Stack, Typography } from "@mui/material"
import { getSvgBox } from "../functions/HelperFunction"

interface Props {
    darkMode?: boolean
}

const LinksDisplay = ({ darkMode = false }: Props) => {

    const currentYear = new Date().getFullYear();

    var textColor = "#18122B";

    if (darkMode) {
        textColor = '#8C83A4'
    }

    return (<>
        <Stack direction='row' justifyContent={'space-between'}>
            <Typography sx={{
                position: 'absolute',
                paddingLeft: '10px',
                paddingBottom: '10px',
                color: textColor,
                display: 'flex',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                zIndex: 0,
                pointerEvents: 'none', // https://stackoverflow.com/questions/16773989/when-div-with-absolute-position-is-added-cannot-click-on-links makes it so that the text does not obstruct any clicks
            }}>Copyright © {currentYear} Jake Yeo</Typography>
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
                        color: textColor,
                        flex: '1',
                        display: 'flex',
                        width: 'fit-content',
                        alignItems: 'center',
                        flexDirection: 'row',
                        zIndex: 4,
                        '&:hover': {
                            color: 'white',
                        }
                    }}
                >
                    {getSvgBox('30px', '30px', "./svgFiles/githubColor.svg")}
                    {'\u00A0GitHub'}
                </Link>
            </Box>
        </Stack>
    </>)
}

export default LinksDisplay