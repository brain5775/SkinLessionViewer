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

  console.log(annotation);

  const newAnnotation = annotation.replace(
    ">",
    `
    viewBox="0 0 100 100">
    <image xlink:href='${image}' />
  `
  );

  return <ImageScaler image={newAnnotation} />;
};

export default Findings;
