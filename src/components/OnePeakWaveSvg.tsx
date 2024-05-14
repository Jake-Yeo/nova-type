
export interface WavePropsType {
    width: string,
    height: string,
    opacity: number
}

const OnePeakWaveSvg = ({ width, height, opacity }: WavePropsType) => {

    // original viewBox (viewBox="0 0 1733 165")
    // viewBox={`0 0 ${width} ${height}`}

    const svgString = `
    <svg viewBox="0 0 1733 168" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M895 56.6547C449.5 -34.3453 139.833 -1.67863 0 56.6547V167.655H1733V56.6547C1546.83 114.988 1221.14 123.273 895 56.6547Z" fill="#D9D9D9"/>
    </svg>
  `;

    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

    return (
        <img src={dataUrl} alt="One Peak Wave" style={{ width: width, height: height, opacity: opacity }} />
    );
}

export default OnePeakWaveSvg