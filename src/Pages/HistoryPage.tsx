import { Stack } from "@mui/material"
import HistoryList from "../components/HistoryList"
import LogoNavBar from "../components/LogoNavBar"

const HistoryPage = () => {
    return (<>
        <Stack justifyContent={"center"} width={"100vw"} alignItems={"center"}>
            <LogoNavBar></LogoNavBar>
            <HistoryList></HistoryList>
        </Stack>
    </>)
}

export default HistoryPage