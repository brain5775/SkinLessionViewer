import { Buffer } from "buffer";
import axios from "axios";
import { useState, useEffect } from "react";
import ImageScaler from "./ImageScaler";

const Findings = (props) => {
  const [image, setImage] = useState();
  const [Loading, setLoading] = useState(true);

  const url = props.url;
  const contentType = props.contentType;
  const annotation = props.annotation;
  const getImage = async () => {
    try {
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer randToken`,
          Accept: "*/*",
        },
        responseType: "arraybuffer",
      });
      const imgURL =
        `data:image/${contentType};base64, ` +
        Buffer.from(response.data, "binary").toString("base64");
      setImage(imgURL);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getImage();
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  const newAnnotation = annotation.replace(
    ">",
    `
    >
    <image xlink:href='${image}' x='0' y='0' />
  `
  );

  return (
    // <div
    //   dangerouslySetInnerHTML={{
    //     __html: DOMPurify.sanitize(newAnnotation),
    //   }}
    //   id={unique}
    //   className="finding"
    // ></div>
    <ImageScaler image={newAnnotation} />
  );
};

export default Findings;
// function setDefaultMode() {
//     scaledImage.width = sourceImage.width;
//     scaledImage.height = sourceImage.height;
//     if (scaledImage.height > canvasordivHeight || scaledImage.width > canvasordivWidth) {
//         let scale1 = canvasordivWidth / sourceImage.width;
//         let scale2 = canvasordivHeight / sourceImage.height;
//         let scale = Math.min(scale1, scale2);

//         scaledImage.height *= scale;
//         scaledImage.width *= scale;
//     }
//     fitCanvasordivRatio = scaledImage.width / sourceImage.width;
//     scale}
