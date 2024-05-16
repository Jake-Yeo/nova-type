export interface WavePropsType {
    width: string,
    height: string,
    opacity: number
}

const TentSvg = ({ width, height, opacity }: WavePropsType) => {

    // original viewBox (viewBox="0 0 1733 165")
    // viewBox={`0 0 ${width} ${height}`}

    // important you movify the svgString to have preserveAspectRatio="none"
    const svgString = `
    <svg width="210" height="119" viewBox="0 0 210 119" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M104.638 0L110.638 42.5L119.638 84L136.138 119H165.138H206.138L195.638 99.5L172.138 77.5L144.638 48L104.638 0Z" fill="#031835"/>
<path d="M104.638 0L110.638 42.5L119.638 84L136.138 119H165.138H206.138L195.638 99.5L172.138 77.5L144.638 48L104.638 0Z" fill="#031835"/>
<path d="M104.638 0L98.6377 42.5L89.6377 84L73.1377 119H44.1377H3.1377L13.6377 99.5L37.1377 77.5L64.6377 48L104.638 0Z" fill="#031835"/>
<path d="M104.638 0L98.6377 42.5L89.6377 84L73.1377 119H44.1377H3.1377L13.6377 99.5L37.1377 77.5L64.6377 48L104.638 0Z" fill="#031835"/>
<path d="M104.639 0L107.64 15H101.64L104.639 0Z" fill="#031835"/>
<path d="M204.089 118.624L206.51 108.37L208.157 108.905L204.089 118.624Z" fill="#031835"/>
<path d="M4.23732 118.646L8.99904e-06 109L1.6377 108.436L4.23732 118.646Z" fill="#031835"/>
</svg>

  `;

    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;

    return (
        <img src={dataUrl} alt="Tent" style={{ width: width, height: height, opacity: opacity }} />
    );
}

export default TentSvg