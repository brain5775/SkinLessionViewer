import { prov } from "../test/data";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { DocumentTextIcon } from "@heroicons/react/20/solid";

const Bundle = (props) => {
  const [Bundle, setBundle] = useState();
  const [Loading, setLoading] = useState(true);
  const [Modal, setModal] = useState(true);

  const url = props.url;

  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD (HH:m)");
  };

  const getBundle = async () => {
    try {
      const response = await axios.get(`${url}`, {
        headers: { Authorization: `Bearer randToken` },
      });
      setBundle(response.data.entry);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBundle();
  }, []);

  if (Loading) {
    return <div>Loading...</div>;
  }

  const docTypeValue = [];
  const docCategoryValue = [];
  let docSubject;
  let docDate;
  const physicianID = [];

  let docTitle;
  let responsibleHospital;
  let docSubjectId;

  const imageType = [];
  const imageCategory = [];
  let capturedDate;
  const attachFile = [];
  const imageAuthorID = [];
  const physicianData = [];
  const imageAuthorData = [];
  const DiagnosticReport = [];

  /* FILTER */
  const providerRoles = prov;

  Bundle.forEach((entry) => {
    if (entry.resource.resourceType === "Composition") {
      entry.resource.type.coding.forEach((tp) => docTypeValue.push(tp.display));
      entry.resource.category.forEach((cat) =>
        cat.coding.forEach((cd) => docCategoryValue.push(cd.display))
      );
      docSubject = entry.resource.subject.display;
      docDate = entry.resource.date;
      entry.resource.author.forEach((aut) => {
        const newAut = aut.reference.split("/");
        physicianID.push(newAut[1]);
      });
      docTitle = entry.resource.title;
      responsibleHospital = entry.resource.custodian.display;
    }
    if (entry.resource.resourceType === "Patient") {
      docSubjectId = entry.resource.id;
    }
    if (entry.resource.resourceType === "DocumentReference") {
      entry.resource.content.forEach((cont) => {
        const attach = cont.attachment;
        const newContentType = attach.contentType.split("/"); //error
        attachFile.push({
          contentType: newContentType[0],
          url: attach.url,
          title: attach.title,
        });
      });
      capturedDate = entry.resource.date;
      entry.resource.type.coding.forEach((cd) => imageType.push(cd.display));
      entry.resource.category.forEach((cat) =>
        cat.coding.forEach((cd) => imageCategory.push(cd.display))
      );
      entry.resource.author.forEach((aut) => {
        const newAut = aut.reference.split("/");
        imageAuthorID.push(newAut[1]);
      });
    }
    if (entry.resource.resourceType === "DiagnosticReport") {
      DiagnosticReport.push(entry.resource);
    }
  });

  console.log(DiagnosticReport);
  physicianID.forEach((id, index) => {
    Bundle.forEach((entry) => {
      const resource = entry.resource;
      const code = [];
      let displayName = "";
      const specialty = [];
      if (resource.resourceType === "PractitionerRole" && resource.id === id) {
        resource.code.forEach((cd) =>
          cd.coding.forEach((coding) => {
            providerRoles.concept.filter((cpt) => {
              if (cpt.code === coding.code)
                code.push({ code: coding.code, display: cpt.display });
              return null;
            });
          })
        );
        displayName = resource.practitioner.display;
        resource.specialty.forEach((spec) =>
          spec.coding.forEach((coding) => specialty.push(coding.display))
        );
        physicianData.push({
          code: code,
          displayName: displayName,
          specialty: specialty,
        });
      }
    });
  });
  imageAuthorID.forEach((id, index) => {
    Bundle.forEach((entry) => {
      const resource = entry.resource;
      const code = [];
      let displayName = "";
      const specialty = [];
      if (resource.resourceType === "PractitionerRole" && resource.id === id) {
        resource.code.forEach((cd) =>
          cd.coding.forEach((coding) => {
            providerRoles.concept.filter((cpt) => {
              if (cpt.code === coding.code)
                code.push({ code: coding.code, display: cpt.display });
              return "";
            });
          })
        );
        displayName = resource.practitioner.display;
        resource.specialty.forEach((spec) =>
          spec.coding.forEach((coding) => specialty.push(coding.display))
        );
        imageAuthorData.push({
          code: code,
          displayName: displayName,
          specialty: specialty,
        });
      }
    });
  });

  return (
    <>
      <div className="p-5 grid grid-flow-row-dense grid-cols-2 gap-3">
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-lg font-bold">Type :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docTypeValue}
          >
            {docTypeValue}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-lg font-bold">Category :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docCategoryValue}
          >
            {docCategoryValue}
          </div>
        </div>
        <div className="flex flex-col gap-2 max-md:col-span-2">
          <label className="text-lg font-bold">Patient Name :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docSubject}
          >
            {docSubject}
          </div>
        </div>
        <div className="flex flex-col gap-2 max-md:col-span-2">
          <label className="text-lg font-bold">Patient Id :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docSubjectId}
          >
            {docSubjectId}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-lg font-bold">Date :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docDate}
          >
            {formatDate(docDate)}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-lg font-bold">Physician :</label>
          <div className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2">
            {physicianData.map((physician, index) => (
              <div key={index}>
                {physician.code.map((cd, idx) => (
                  <span
                    key={idx}
                    className={
                      cd.code === "RP" ? "text-indigo-600" : "text-sky-300"
                    }
                  >
                    {cd.display}
                    <span className="text-gray-800">
                      {idx !== 0 ? "," : ""}
                    </span>
                  </span>
                ))}{" "}
                -{" "}
                <span key={physician.displayName}>
                  {physician.displayName} -{" "}
                </span>
                <span key={physician.specialty}>
                  {physician.specialty.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-lg font-bold">Title :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docTitle}
          >
            {docTitle}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-lg font-bold">Responsible Hospital :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={responsibleHospital}
          >
            {responsibleHospital}
          </div>
        </div>
      </div>
      <div className="dash-line my-4 h-px" />
      <h4 className="text-2xl font-bold ">Image Information :</h4>
      <div className="p-5 grid grid-flow-row-dense grid-cols-1 gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Type :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={imageType}
          >
            {imageType.join(", ")}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Category :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={imageCategory}
          >
            {imageCategory.join(", ")}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Captured Date :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={capturedDate}
          >
            {formatDate(capturedDate)}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Physician :</label>
          <div className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2">
            {imageAuthorData.map((physician, index) => (
              <div key={physician + index}>
                {physician.code.map((cd, idx) => (
                  <span
                    key={cd}
                    className={
                      cd.code === "RP" ? "text-indigo-600" : "text-blue-500"
                    }
                  >
                    {cd.display}
                    <span className="text-gray-800">
                      {idx !== 0 ? "," : ""}
                    </span>
                  </span>
                ))}{" "}
                -{" "}
                <span key={physician.displayName}>
                  {physician.displayName} -{" "}
                </span>
                <span key={physician.specialty}>
                  {physician.specialty.join(", ")}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Date :</label>
          <div
            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
            key={docDate}
          >
            {formatDate(docDate)}
          </div>
        </div>
        <div className="dash-line p-3 flex flex-col gap-2 max-w-full">
          <div className="flex flex-col gap-3">
            {attachFile.map((file, index) => {
              if (file.contentType === "image")
                return (
                  <div
                    className="flex gap-3 flex-wrap items-start w-full"
                    key={file + index}
                  >
                    <img src={file.url} className="w-60 h-60" alt="" />
                    <div className="flex flex-col gap-3  flex-auto">
                      <label className="text-lg font-bold">
                        Document Title :
                      </label>
                      <div className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2">
                        {file.title}
                      </div>
                    </div>
                  </div>
                );
              else
                return (
                  <div className="w-full h-2/4" key={file + index}>
                    INI {file.contentType}
                  </div>
                );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold">Report: </label>
          <ul>
            {DiagnosticReport.map((report, index) => (
              <li key={index} className="relative">
                <span className="absolute left-0 top-2/4 -translate-y-2/4">
                  <DocumentTextIcon className="w-6 h-6" />
                </span>
                <span className="ml-8 link link-underline link-underline-black cursor-pointer text-xl font-semibold text-slat">
                  {report.resourceType} - {report.id}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <button className="bg-gray-800 text-white p-2 text-lg font-semibold rounded-lg">
          Create Report
        </button>
      </div>
    </>
  );
};

export default Bundle;
