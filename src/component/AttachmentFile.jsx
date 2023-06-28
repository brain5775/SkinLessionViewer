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
          <div className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 text-ellipsis overflow-hidden">
            {title}
          </div>
        </div>
        <div className="my-3 w-2/5 h-2/5">
          <Image url={url} contentType={contentType[1]}></Image>
        </div>
      </>
    );
  }
  return <>Hadeh</>;
};

export default AttachmentFile;
