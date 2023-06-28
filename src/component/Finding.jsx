import { Buffer } from "buffer";
import axios from "axios";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { uid } from "uid";

const Findings = (props) => {
  const [image, setImage] = useState();
  const [Loading, setLoading] = useState(true);

  const url = props.url;
  const contentType = props.contentType;
  const annotation = props.annotation;
  const unique = uid(4);
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

  // const newAnnotation2 = newAnnotation.replace('width="3008"', "width='200'");
  // const newAnnotation3 = newAnnotation2.replace(
  //   'height="2000"',
  //   "height='200'"
  // );

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(newAnnotation),
      }}
      id={unique}
      className="finding"
    ></div>
  );
};

export default Findings;
