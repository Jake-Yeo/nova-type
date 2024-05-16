
export interface WavePropsType {
    width: string,
    height: string,
    opacity: number
}

const MountainRocksSvg = ({ width, height, opacity }: WavePropsType) => {

    // original viewBox (viewBox="0 0 1733 165")
    // viewBox={`0 0 ${width} ${height}`}

    // important you movify the svgString to have preserveAspectRatio="none"
    const svgString = `
    <svg width="1459" height="151" viewBox="0 0 1459 151" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1458.5 151V91.198H1436.5L1379 101.663L1312.5 52.8251L1260 33.3894L1237.5 52.8251L1208 25.4158H1189.5L1172 8.47195L1148.5 0L1034.5 33.3894V101.663L996.5 44.3531H923L748.5 101.663L662 115.617L577 66.2805L440 80.2343L372.5 115.617L335.5 101.663L271 136.548L215.5 151L139 115.617L115.5 143.525L61 136.548L0 151H215.5H1458.5Z" fill="#020F22"/>
    </svg>
  `;

    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

    return (
        <img src={dataUrl} alt="MountainBase" style={{ width: width, height: height, minHeight: 43, opacity: opacity }} />
    );
}

export default MountainRocksSvg