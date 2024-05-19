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
                        zIndex: 3,
                        '&:hover': {
                            color: 'white',
                        }
                    }}
                >
                    {getSvgBox('30px', '30px', "./svgFiles/githubColor.svg")}
                    {'\u00A0GitHub'}
                </Link>
            </Box>
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
                zIndex: 2,
            }}>Copyright © {currentYear} Jake Yeo</Typography>
        </Stack>
    </>)
}

export default LinksDisplay