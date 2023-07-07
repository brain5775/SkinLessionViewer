import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import AttachmentFile from "./AttachmentFile";
import "../styles/formInfo.css";

const DocumentReference = () => {
  const [docRef, setDocRef] = useState();
  const [Loading, setLoading] = useState(true);

  const getDocumentReference = async () => {
    try {
      const response = await axios.get(
        // "https://203.64.84.150:58443/r5/fhir/DocumentReference/4439",
        // "https://203.64.84.150:58443/r5/fhir/DocumentReference/TCUMI.DocumentReference.skinlesionreport01",
        "https://203.64.84.150:58443/r5/fhir/DocumentReference/TCUMI.DocumentReference.skinlesionreport02",
        {
          headers: { Authorization: `Bearer randToken` },
        }
      );
      setDocRef(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD (HH:m)");
  };

  useEffect(() => {
    getDocumentReference();
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  const docRef_id = docRef.id;
  const docRef_type = [];
  docRef.type.coding.forEach((cd) => docRef_type.push(cd.display));
  const docRef_category = [];
  docRef.category.forEach((cat) =>
    cat.coding.forEach((cd) => docRef_category.push(cd.display))
  );
  const docRef_subject = docRef.subject.reference;
  const docRef_date = docRef.date;
  const docRef_author = [];
  docRef.author.forEach((aut) => docRef_author.push(aut.display));
  const docRef_custodian = docRef.custodian.display;
  const docRef_content = docRef.content;

  return (
    <div className="container mx-auto py-12 text-slate-700 font-mono">
      <h4 className="text-2xl font-bold">Document Reference :</h4>
      <div className="p-3 mb-3 grid grid-flow-row-dense gap-3">
        <div className="flex gap-2  flex-col">
          <label className="text-lg font-bold">Document ID :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docRef_id}
          >
            {docRef_id}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label className="text-lg font-bold">Document Type :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docRef_type}
          >
            {docRef_type.join(", ")}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label className="text-lg font-bold">Document Category :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 whitespace-pre"
            key={docRef_category}
          >
            {docRef_category.join("\r\n")}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label className="text-lg font-bold">Document Subject :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docRef_subject}
          >
            {docRef_subject}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label className="text-lg font-bold">Document Date :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docRef_date}
          >
            {formatDate(docRef_date)}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label className="text-lg font-bold">Document Author :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docRef_author}
          >
            {docRef_author.join(", ")}
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <label className="text-lg font-bold">Responsible Hospital :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docRef_custodian}
          >
            {docRef_custodian}
          </div>
        </div>
      </div>

      <h4 className="text-2xl font-bold text-divider">Attachment</h4>
      <div className="mb-3 p-3">
        {docRef_content.map((content, index) => (
          <div
            key={index}
            className="p-5 mb-6
            bg-slate-400 rounded-xl
            "
          >
            <AttachmentFile attachment={content.attachment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentReference;
