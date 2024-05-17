import { getWaveAnimation } from "../functions/HelperFunction"
import OnePeakWaveSvg from "./OnePeakWaveSvg"
import TwoPeakWaveSvg from "./TwoPeakWaveSvg"

interface Props {
    heightSubtraction?: number // ? indicates optional prop
}

const CloudOceanAnimation = ({ heightSubtraction }: Props) => {

    if (heightSubtraction) {
        return (<>
            {getWaveAnimation(`${10 - heightSubtraction}vh`, 0.25, 'forwards', 8, OnePeakWaveSvg)}
            {getWaveAnimation(`${15 - heightSubtraction}vh`, 0.25, 'forwards', 5, TwoPeakWaveSvg)}
            {getWaveAnimation(`${18 - heightSubtraction}vh`, 0.25, 'backwards', 9, TwoPeakWaveSvg)}

            {getWaveAnimation(`${20 - heightSubtraction}vh`, 0.25, 'backwards', 11, OnePeakWaveSvg)}
            {getWaveAnimation(`${15 - heightSubtraction}vh`, 0.25, 'forwards', 8, TwoPeakWaveSvg)}
            {getWaveAnimation(`${25 - heightSubtraction}vh`, 0.25, 'forwards', 15, TwoPeakWaveSvg)}
        </>)
    } else {
        return (
            <>
                {getWaveAnimation('10vh', 0.25, 'forwards', 8, OnePeakWaveSvg)}
                {getWaveAnimation('15vh', 0.25, 'forwards', 5, TwoPeakWaveSvg)}
                {getWaveAnimation('18vh', 0.25, 'backwards', 9, TwoPeakWaveSvg)}

                {getWaveAnimation('20vh', 0.25, 'backwards', 11, OnePeakWaveSvg)}
                {getWaveAnimation('15vh', 0.25, 'forwards', 8, TwoPeakWaveSvg)}
                {getWaveAnimation('25vh', 0.25, 'forwards', 15, TwoPeakWaveSvg)}
            </>
        )
    }
}

export default CloudOceanAnimation