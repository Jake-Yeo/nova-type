import { Box } from "@mui/material"
import CampFireSvg from "./CampFireSvg"

const CampFireAnimation = () => {
    return (<>
        <Box
            sx={{
                marginBottom: '-5px',
                width: 50,
                height: 70,
                // filter: 'blur(px)',
                position: 'relative',
                zIndex: 0,
            }}
        >
            <Box sx={{ position: 'absolute'}}>
                <img src='./svgFiles/flame.gif' alt="Your GIF" style={{ width: '100%', height: '100%', objectFit: 'cover', }} />
            </Box>
            <Box sx={{ position: 'absolute', width: '150px', height: '110px', backdropFilter: 'blur(20px)', marginLeft:'-35px', top: '-30px' }} />
            <Box sx={{ position: 'absolute', width: '150px', height: '110px', backdropFilter: 'blur(3px)', marginLeft:'-35px', top: '-30px' }} />
            <Box sx={{ position: 'absolute', filter: 'blur(0.5px)'}}> {/** I like the flamed blurred a little */}
                <img src='./svgFiles/flame.gif' alt="Your GIF" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
        </Box>
        <Box sx={{ zIndex: 1, position: 'relative' }}> {/** Make it relative because zIndex only works with relative positions */}
            <CampFireSvg width={"60px"} height={"30px"} opacity={1}></CampFireSvg>
        </Box>
    </>)
}

export default CampFireAnimation