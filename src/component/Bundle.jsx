import { prov } from "../test/data";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import { DocumentTextIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";

import { Ripple, initTE } from "tw-elements";

initTE({ Ripple });

const Bundle = (props) => {
  const [Bundle, setBundle] = useState();
  const [Loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [Report, setReport] = useState();

  const url = props.url;

  const formatDate = (date) => {
    console.log(date);
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
  let docDate;
  const physicianID = [];

  let docTitle;
  let responsibleHospital;
  const docSubject = [];
  let docSubjectId;

  // const imageType = [];
  // const imageCategory = [];
  // let capturedDate;
  // const attachFile = [];
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
      entry.resource.name.forEach((name) => {
        docSubject.push(name.text);
      });
    }
    if (entry.resource.resourceType === "DiagnosticReport") {
      DiagnosticReport.push(entry.resource);
    }
  });

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

  const openModal = (rep) => {
    setShowModal(true);
    setReport(rep);
  };

  return (
    <>
      <div className="bundle">
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
              className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 whitespace-pre"
              key={docCategoryValue}
            >
              {docCategoryValue.join("\r\n")}
            </div>
          </div>
          <div className="flex flex-col gap-2 max-md:col-span-2">
            <label className="text-lg font-bold">Patient Name :</label>
            <div
              className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2"
              key={docSubject}
            >
              {docSubject.join(", ")}
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
          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-lg font-bold">Report: </label>
            <ul>
              {DiagnosticReport.map((report, index) => (
                <li
                  key={index}
                  className="relative inline-flex items-center gap-2"
                  onClick={() => openModal(report)}
                >
                  <span>
                    <DocumentTextIcon className="w-6 h-6" />
                  </span>
                  <span className="link link-underline link-underline-black cursor-pointer text-xl font-semibold whitespace-break-spaces text-ellipsis">
                    {report.resourceType} - {report.id}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            className="bg-gray-800 text-white p-2 text-lg font-semibold rounded-lg inlin"
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            data-te-ripple-duration="500ms"
          >
            Create Report
          </button>
        </div>
      </div>
      <>
        {showModal ? (
          <>
            <Modal
              setShowModal={setShowModal}
              report={Report}
              data={Bundle}
            ></Modal>
          </>
        ) : null}
      </>
    </>
  );
};

export default Bundle;
