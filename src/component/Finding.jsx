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
  const scaler = props.scaler;
  console.log(contentType);
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
        `data:${contentType};base64, ` +
        Buffer.from(response.data, "binary").toString("base64");
      console.log(response.data);
      console.log(imgURL);
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
    ><image xlink:href='${image}' />
  `
  );
  console.log(image);

  return <ImageScaler image={newAnnotation} scaler={scaler} />;
};

export default Findings;
