import React, { useState, useEffect } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { Document, Page, pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const BoxPdf = (props) => {
  const [Loading, setLoading] = useState(true);
  const [pdf, setPdf] = useState("");
  const [numPages, setNumPages] = useState(1);

  const url = props.url;
  const contentType = props.contentType;

  const getPdf = async () => {
    try {
      const response = await axios.get(`${url}`, {
        headers: {
          Authorization: `Bearer randToken`,
          Accept: "*/*",
        },
        responseType: "arraybuffer",
      });

      const pdfURL =
        `data:application/${contentType};base64, ` +
        Buffer.from(response.data, "binary").toString("base64");
      setPdf(pdfURL);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPdf();
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          renderTextLayer={false}
          renderAnnotationLayer={false}
          customTextRenderer={false}
          key={`page_${index + 1}`}
          className="pdf-page"
          pageNumber={index + 1}
        />
      ))}
    </Document>
  );
};

export default BoxPdf;
