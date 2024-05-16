
export interface WavePropsType {
    width: string,
    height: string,
    opacity: number
}

const MountainBaseSvg = ({ width, height, opacity }: WavePropsType) => {

    // original viewBox (viewBox="0 0 1733 165")
    // viewBox={`0 0 ${width} ${height}`}

    // important you movify the svgString to have preserveAspectRatio="none"
    const svgString = `
    <svg width="1896" height="86" viewBox="0 0 1896 86" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1896" height="86" fill="#020F22"/>
    </svg>
  `;

    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

    return (
        <img src={dataUrl} alt="MountainBase" style={{ width: width, height: height, minHeight: 29, opacity: opacity, zIndex: 2 }} />
    );
}

export default MountainBaseSvg