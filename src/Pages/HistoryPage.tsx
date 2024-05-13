import { Stack, Typography } from "@mui/material"
import HistoryList from "../components/HistoryList"
import LogoNavBar from "../components/LogoNavBar"
import { TypingDataContext } from "../components/TypeFeedAreaDisplay"
import { useContext, useEffect } from "react"
import { currentUser } from "../objects/User"

const HistoryPage = () => {

    const typingData = useContext(TypingDataContext);

    var historyPageContents = <HistoryList></HistoryList>;

        if (currentUser.getTypingStats().length == 0) {
            historyPageContents = <Typography color='white'>Empty!</Typography>
        } else {
            historyPageContents = <HistoryList></HistoryList>;
        }


    return (<>
        <Stack justifyContent={"center"} width={"100vw"} alignItems={"center"}>
            <LogoNavBar></LogoNavBar>
            {historyPageContents}
        </Stack>
    </>)
}

export default HistoryPage