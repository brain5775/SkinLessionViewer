import { useRef, useEffect } from "react";

const ImageScaler = (props) => {
  const svg = props.image;
  const svgRef = useRef(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svg, "text/html");
    const htmlElement = doc.documentElement;
    const svgElement = htmlElement.querySelector("svg");
    const svgWidth = svgElement.getAttribute("width");
    const svgHeight = svgElement.getAttribute("height");
    if (svgElement) {
      svgElement.setAttribute("width", "300");
      svgElement.setAttribute("height", "300");
    }

    const imageElement = svgElement.querySelector("image");
    if (imageElement) {
      if (svgWidth > 300 || svgHeight > 300) {
        const scale1 = 300 / svgWidth;
        const scale2 = 300 / svgHeight;
        const totalScale = Math.min(scale1, scale2);

        const newImageWidth = svgWidth * totalScale;
        const newImageHeight = svgHeight * totalScale;
        imageElement.setAttribute("width", newImageWidth);
        imageElement.setAttribute("height", newImageHeight);
      }
    }
    const rectElement = svgElement.querySelector("rect");
    const rectWidth = rectElement.getAttribute("width");
    const rectHeight = rectElement.getAttribute("height");
    const rectX = rectElement.getAttribute("x");
    const rectY = rectElement.getAttribute("y");
    if (rectElement) {
      if (svgWidth > 300 || svgHeight > 300) {
        const scale1 = 300 / svgWidth;
        const scale2 = 300 / svgHeight;
        const totalScale = Math.min(scale1, scale2);

        const newRectWidth = rectWidth * totalScale;
        const newRectHeight = rectHeight * totalScale;
        const newRectX = rectX * totalScale;
        const newRectY = rectY * totalScale;
        rectElement.setAttribute("width", newRectWidth);
        rectElement.setAttribute("height", newRectHeight);
        rectElement.setAttribute("x", newRectX);
        rectElement.setAttribute("y", newRectY);
      }
    }

    svgRef.current.appendChild(htmlElement);
  }, []);
  return <div ref={svgRef}></div>;
};

export default ImageScaler;
