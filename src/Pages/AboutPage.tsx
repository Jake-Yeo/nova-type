import { useEffect } from "react";
import CampUnderTwilightBackground from "../components/CampUnderTwilightBackground"
import { purgeAllStylesWithGlobalId } from "../functions/HelperFunction";

const AboutPage = () => {

    useEffect(() => {
        return (() => {
            purgeAllStylesWithGlobalId(); // basically remove all style elements relating to the animations which were generating (although styles dissapear when the timer ends, if the page switches before the timer ends, then the style will not be deleted)
        })
    }, [])

    return (<>
        <CampUnderTwilightBackground occasionalShootingStar={true}>

        </CampUnderTwilightBackground>
    </>)
}

export default AboutPage