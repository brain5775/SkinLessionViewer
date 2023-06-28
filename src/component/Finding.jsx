import { Buffer } from "buffer";
import axios from "axios";
import { useState, useEffect } from "react";

const Findings = (props) => {
  const [image, setImage] = useState();
  const [Loading, setLoading] = useState(true);

  const url = props.url;
  const contentType = props.contentType;
  const title = props.title;
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
    "\n",
    `<image x='0' y='0' xlinkHref=${image}></image>`
  );
  return (
    // <div
    //   dangerouslySetInnerHTML={{
    //     __html: newAnnotation,
    //   }}
    // ></div>
    <svg width="3008" height="2000">
      <image height="100%" width="100%" xlinkHref={image}></image>
    </svg>
  );
};

export default Findings;
