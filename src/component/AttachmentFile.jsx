import axios from "axios";
import moment from "moment";
import { Buffer } from "buffer";
import Bundle from "./Bundle";
import Image from "./Image";

const AttachmentFile = (props) => {
  const contentType = props.attachment.contentType.toLowerCase().split("/");
  const title = props.attachment.title;
  const url = props.attachment.url;

  if (contentType[0] === "application" && contentType[1] === "json+fhir") {
    return (
      <>
        <h3 className="text-xl font-extrabold">{title}</h3>
        <Bundle url={url}></Bundle>
      </>
    );
  }
  if (contentType[0] === "image") {
    return (
      <>
        <div className="flex flex-col gap-3 flex-auto">
          <label className="text-lg font-bold">Image Title :</label>
          <div className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2">
            {title}
          </div>
        </div>
        <div className="w-96 max-h-96 my-3">
          <Image url={url} contentType={contentType[1]}></Image>
        </div>
      </>
    );
  }
  return <>Hadeh</>;
};

export default AttachmentFile;
