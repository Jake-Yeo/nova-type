import { Stack, Typography } from "@mui/material"
import HistoryList from "../components/HistoryList"
import LogoNavBar from "../components/LogoNavBar"
import { TypingDataContext } from "../components/TypeFeedAreaDisplay"
import { useContext, useEffect, useReducer } from "react"
import { currentUser } from "../objects/User"
import { auth } from "../config/firebase"
import { useNavigate } from "react-router-dom"

const HistoryPage = () => {

    let historyPageContents;

    if (currentUser.getTypingStats().length === 0) {
        historyPageContents = <Typography color='white'>Empty! Type something first then come back!</Typography>;
    } else {
        historyPageContents = <HistoryList />;
    }

    return (<>
        <Stack justifyContent={"center"} width={"100vw"} alignItems={"center"}>
            <LogoNavBar></LogoNavBar>
            {historyPageContents}
        </Stack>
    </>)
}

export default HistoryPage