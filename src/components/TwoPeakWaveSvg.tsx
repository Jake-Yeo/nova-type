
export interface WavePropsType {
    width: string,
    height: string,
    opacity: number
}

const TwoPeakWaveSvg = ({ width, height, opacity}: WavePropsType) => {

    // original viewBox (viewBox="0 0 1733 165")
    // viewBox={`0 0 ${width} ${height}`}

    // important you movify the svgString to have preserveAspectRatio="none"
    const svgString = `
    <svg viewBox="0 0 1733 165" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="113" width="1733" height="52" fill="#9287B7" />
      <path d="M351.5 53.0075C199.5 -46.4708 105 18.1901 0 53.0075V118H1733V53.0075C1643.17 85.2827 1426.9 130.468 1280.5 53.0075C1134.1 -24.4529 926.833 20.7323 841.5 53.0075C741.5 94.4568 503.5 152.486 351.5 53.0075Z" fill="#9287B7" />
    </svg>
  `;

  const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

  return (
    <img src={dataUrl} alt="Two Peak Wave" style={{ width: width, height: height, opacity: opacity}} />
  );
}

export default TwoPeakWaveSvg