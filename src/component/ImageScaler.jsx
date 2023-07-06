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
    let scaler;
    if (svgElement) {
      svgElement.setAttribute("width", "300");
      svgElement.setAttribute("height", "300");
      const childSVGElement = svgElement.children;
      if (svgWidth > 300 || svgHeight > 300) {
        const scale1 = 300 / svgWidth;
        const scale2 = 300 / svgHeight;
        const totalScale = Math.min(scale1, scale2);
        scaler = totalScale;
      }

      for (let i = 0; i < childSVGElement.length; i++) {
        if (i !== 0) {
          for (
            let att,
              j = 0,
              atts = childSVGElement[i].attributes,
              n = atts.length;
            j < n;
            j++
          ) {
            att = atts[j];
            // console.log(att.nodeValue);
            if (
              att.nodeName === "x" ||
              att.nodeName === "y" ||
              att.nodeName === "width" ||
              att.nodeName === "height"
            ) {
              att.nodeValue *= scaler;
            }
          }
        }
      }
    }

    const imageElement = svgElement.querySelector("image");
    if (imageElement) {
      const newImageWidth = svgWidth * scaler;
      const newImageHeight = svgHeight * scaler;
      imageElement.setAttribute("width", newImageWidth);
      imageElement.setAttribute("height", newImageHeight);
    }

    svgRef.current.appendChild(htmlElement);
  }, []);
  return <div ref={svgRef}></div>;
};

export default ImageScaler;
