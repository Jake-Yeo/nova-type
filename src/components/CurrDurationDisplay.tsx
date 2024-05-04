import { Context, Dispatch, SetStateAction, useContext } from "react";
import { TypingDataContext } from "./TypeFeedAreaDisplay";

const CurrDuratiionDisplay = () => {



    return (
        <>
            <span
                style={{
                    color: '#635985'
                }}
            //&nbsp; is a white space that forces react to render a space. For some reason it is not rendering normal spaces like " "
            >Duration:&nbsp;</span>
        </>
    )
}

export default CurrDuratiionDisplay