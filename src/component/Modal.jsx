import { prov } from "../test/data";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Ripple, initTE } from "tw-elements";
import moment from "moment";
import Image from "./Image";
import Findings from "./Finding";

initTE({ Ripple });

const Modal = (props) => {
  const report = props.report;
  const data = props.data;

  /* METHODS */
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD (HH:m)");
  };

  /* DATA */

  // report
  const report_id = report.id;
  const encounter_reference = report.encounter.reference.split("/");
  const visit_id = encounter_reference[1];
  const report_issued = report.issued;
  const physician_data = [];
  const provider_roles = prov;
  report.resultsInterpreter.forEach((result) => {
    const resultSplit = result.reference.split("/");
    data.forEach((entry) => {
      const resource = entry.resource;
      const code = [];
      let displayName = "";
      const specialty = [];
      if (
        resource.resourceType === resultSplit[0] &&
        resource.id === resultSplit[1]
      ) {
        resource.code.forEach((cd) =>
          cd.coding.forEach((coding) => {
            provider_roles.concept.filter((cpt) => {
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
        physician_data.push({
          code: code,
          displayName: displayName,
          specialty: specialty,
        });
      }
    });
  });

  // patient
  let patient_id;
  const patient_name = [];
  let gender;
  let date_of_birth;

  data.forEach((entry) => {
    const resource = entry.resource;
    if (resource.resourceType === "Patient") {
      patient_id = resource.id;
      resource.name.forEach((name) => {
        patient_name.push(name.text);
      });
      gender = resource.gender;
      date_of_birth = resource.birthDate;
    }
    return;
  });

  // diagnostic
  const report_conclusion = report.conclusion;
  const report_diagnostic = [];
  report.conclusionCode.forEach((cc) =>
    cc.coding.forEach((coding) => report_diagnostic.push(coding.display))
  );
  console.log(data);

  // lesion
  const lesion_observation = [];

  const images = [];

  report.media.forEach((media) => {
    const link = media.link.reference.split("/");
    const search_media = data.filter((entry) => {
      const resource = entry.resource;
      if (resource.resourceType === link[0] && resource.id === link[1])
        return entry;
    });

    search_media[0].resource.content.forEach((content) => {
      images.push(content.attachment);
    });
  });

  report.result.forEach((result) => {
    const result_split = result.reference.split("/");
    const search_report = data.filter((entry) => {
      const resource = entry.resource;
      if (
        resource.resourceType === result_split[0] &&
        resource.id === result_split[1]
      )
        return entry;
    });

    // lesion data
    const lesion_name = [];
    const lesion_body_site = [];
    const lesion_color = [];
    let lesion_length;
    let lesion_width;
    let lesion_depth;
    const lesion_arrangement = [];
    const lesion_border = [];
    let lesion_evolution;
    const lesion_primary_morphology = [];
    const lesion_secondary_change = [];
    const lesion_shape_configuration = [];
    const lesion_reaction_pattern = [];
    const skin_type = [];
    let personal_hx_melanoma;
    let family_hx_melanoma;

    search_report[0].resource.identifier.forEach((idf) =>
      lesion_name.push(idf.value)
    );
    search_report[0].resource.bodySite.coding.forEach((cd) => {
      lesion_body_site.push(cd.display);
    });
    search_report[0].resource.component.forEach((component) => {
      component.code.coding.filter((coding) => {
        if (coding.code === "skinlesion.color") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_color.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "skinlesion.length") {
          lesion_length =
            component.valueQuantity.value.toString() +
            " " +
            component.valueQuantity.unit;
          return this;
        }
        if (coding.code === "skinlesion.width") {
          lesion_width =
            component.valueQuantity.value.toString() +
            " " +
            component.valueQuantity.unit;
          return this;
        }
        if (coding.code === "skinlesion.depth") {
          lesion_depth =
            component.valueQuantity.value.toString() +
            " " +
            component.valueQuantity.unit;
          return this;
        }
        if (coding.code === "skinlesion.arrangement") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_arrangement.push(cdg.display);
          });
        }
        if (coding.code === "skinlesion.border") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_border.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "skinlesion.border") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_border.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "skinlesion.evolution") {
          lesion_evolution = component.valueBoolean;
          return this;
        }
        if (coding.code === "skinlesion.primarymorphology") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_primary_morphology.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "skinlesion.secondarychange") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_secondary_change.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "skinlesion.shapeconfiguration") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_shape_configuration.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "skinlesion.reactionpattern") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            lesion_reaction_pattern.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "skin.type") {
          component.valueCodeableConcept.coding.forEach((cdg) => {
            skin_type.push(cdg.display);
          });
          return this;
        }
        if (coding.code === "PersonalHxmelanoma") {
          personal_hx_melanoma = component.valueBoolean;
          return this;
        }
        if (coding.code === "FamilyHxmelanoma") {
          family_hx_melanoma = component.valueBoolean;
          return this;
        }
      });
    });

    // lesion finding
    const finding = [];

    search_report[0].resource.derivedFrom.forEach((derivedFrom) => {
      const df = derivedFrom.reference.split("/");
      let annotation_data;
      let annotation_image;
      const search_annotation = data.filter((entry) => {
        const resource = entry.resource;
        if (resource.resourceType === df[0] && resource.id === df[1])
          return entry;
      });

      search_annotation[0].resource.component.forEach((component) => {
        component.code.coding.filter((coding) => {
          if (coding.code === "annotation.svg") {
            annotation_data = atob(component.valueAttachment.data).trim();
            return this;
          }
          if (coding.code === "annotated.image") {
            annotation_image = component.valueAttachment;
            return this;
          }
        });
      });
      finding.push({
        annotation_data,
        annotation_image,
      });
    });
    lesion_observation.push({
      data: {
        name: lesion_name,
        body_site: lesion_body_site,
        color: lesion_color,
        length: lesion_length,
        width: lesion_width,
        depth: lesion_depth,
        arrangement: lesion_arrangement,
        border: lesion_border,
        evolution: lesion_evolution,
        primary_morphology: lesion_primary_morphology,
        secondary_change: lesion_secondary_change,
        shape_configuration: lesion_shape_configuration,
        reaction_pattern: lesion_reaction_pattern,
        skin_type: skin_type,
        personal_hx_melanoma: personal_hx_melanoma,
        family_hx_melanoma: family_hx_melanoma,
      },
      finding: finding,
    });
  });

  console.log(lesion_observation);

  return (
    <>
      <div className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="my-6 mx-auto pb-6 rounded-lg bg-white h-5/6 w-11/12 overflow-x-hidden
        relative
        "
        >
          <header className="sticky top-0 z-50 bg-white">
            <section className="px-6 pt-6 flex justify-between items-center gap-8">
              <h4 className="text-2xl font-extrabold">
                {report.resourceType} - {report.id}
              </h4>
              <span
                onClick={() => props.setShowModal(false)}
                className="cursor-pointer rounded-full inline-block hover:text-red-500 transition duration-300 ease-linear"
              >
                <XMarkIcon className="w-8 h-8" />
              </span>
            </section>
            <hr className="border-slate-500 my-6" />
          </header>
          <section
            aria-label="body"
            className="px-6 grid grid-flow-row-dense grid-cols-1 gap-5"
          >
            <div className="px-6 grid grid-flow-row-dense grid-cols-1 md:grid-cols-2">
              <section
                aria-label="left-side-data"
                className="px-4 grid grid-flow-row-dense grid-cols-1 gap-3"
              >
                <section id="report-detail">
                  <h5 className="text-xl text-white font-bold bg-slate-500 px-4 py-2 rounded-se-lg rounded-ss-lg shadow-xl">
                    Diagnostic Report
                  </h5>
                  <div className="px-4 pt-2 pb-6 rounded-ee-lg rounded-es-lg shadow-xl capitalize">
                    <div className="grid grid-flow-row-dense grid-cols-1 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">Report ID :</label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={report_id}
                        >
                          {report_id}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">Visit ID :</label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={visit_id}
                        >
                          {visit_id}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">
                          Last Updated :
                        </label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={report_issued}
                        >
                          {formatDate(report_issued)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">Physician :</label>
                        <div className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2">
                          {physician_data.map((physician, index) => (
                            <div key={index}>
                              {physician.code.map((cd, idx) => (
                                <span
                                  key={idx}
                                  className={
                                    cd.code === "RP"
                                      ? "text-indigo-600"
                                      : "text-sky-300"
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
                    </div>
                  </div>
                </section>

                <section id="patient-detail">
                  <h5 className="text-xl text-white font-bold bg-slate-500 px-4 py-2 rounded-se-lg rounded-ss-lg shadow-xl">
                    Patient Information
                  </h5>
                  <div className="px-4 pt-2 pb-6 rounded-ee-lg rounded-es-lg shadow-xl capitalize">
                    <div className="grid grid-flow-row-dense grid-cols-1 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">
                          Patient ID :
                        </label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={patient_id}
                        >
                          {patient_id}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">Name :</label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={patient_name}
                        >
                          {patient_name}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">
                          Date of Birth :
                        </label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={date_of_birth}
                        >
                          {formatDate(date_of_birth)}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">Gender :</label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={gender}
                        >
                          {gender}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section id="conclusion">
                  <h5 className="text-xl text-white font-bold bg-slate-500 px-4 py-2 rounded-se-lg rounded-ss-lg shadow-xl">
                    Conclusion
                  </h5>
                  <div className="px-4 pt-2 pb-6 rounded-ee-lg rounded-es-lg shadow-xl capitalize">
                    <div className="grid grid-flow-row-dense grid-cols-1 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">
                          Diagnostic :
                        </label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={report_diagnostic}
                        >
                          {report_diagnostic.join(", ")}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-bold">
                          Conclusion :
                        </label>
                        <div
                          className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                          key={report_conclusion}
                        >
                          {report_conclusion}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </section>
              <section
                aria-label="right-side-data"
                className="px-4 grid grid-flow-row-dense grid-cols-1 gap-3"
              >
                <section id="images">
                  <h5 className="text-xl text-white font-bold bg-slate-500 px-4 py-2 rounded-se-lg rounded-ss-lg shadow-xl">
                    Images
                  </h5>
                  <div className="px-4 pt-2 pb-6 rounded-ee-lg rounded-es-lg shadow-xl capitalize">
                    <div className="grid grid-flow-row-dense grid-cols-3 gap-4">
                      {images.map((img, index) => (
                        <div key={index}>
                          <Image url={img.url} contentType={img.contentType} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </section>
            </div>

            {lesion_observation.map((lesion, index) => (
              <div
                className="px-6 grid grid-flow-row-dense grid-cols-1 md:grid-cols-2"
                key={index}
              >
                <section
                  aria-label="left-side-data"
                  className="px-4 grid grid-flow-row-dense grid-cols-1 gap-3"
                >
                  <section id={"history-" + index} key={index}>
                    <h5 className="text-xl text-white font-bold bg-slate-500 px-4 py-2 rounded-se-lg rounded-ss-lg shadow-xl">
                      Lesion Observation - {index + 1}
                    </h5>
                    <div className="px-4 pt-2 pb-6 rounded-ee-lg rounded-es-lg shadow-xl capitalize">
                      <div className="grid grid-flow-row-dense grid-cols-1 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Lesion Name
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.name}
                          >
                            {lesion.data.name}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">Body Site</label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.body_site}
                          >
                            {lesion.data.body_site.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">Colors</label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.color}
                          >
                            {lesion.data.color.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">Colors</label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.color}
                          >
                            {lesion.data.color.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">Size</label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full lowercase"
                            key={Math.random()}
                          >
                            {lesion.data.length} x {lesion.data.width} x{" "}
                            {lesion.data.depth}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Arrangement
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.arrangement}
                          >
                            {lesion.data.arrangement.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">Border</label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.border}
                          >
                            {lesion.data.border.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">Evolution</label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={Math.random()}
                          >
                            {lesion.data.evolution.toString()}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Primary morphology
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.primary_morphology}
                          >
                            {lesion.data.primary_morphology.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Secondary Change
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.secondary_change}
                          >
                            {lesion.data.secondary_change.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Shape and Configuration
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.shape_configuration}
                          >
                            {lesion.data.shape_configuration.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Reaction Pattern
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.reaction_pattern}
                          >
                            {lesion.data.reaction_pattern.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">Skin Type</label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={lesion.data.skin_type}
                          >
                            {lesion.data.skin_type.join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Personal Hx Melanoma
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={Math.random()}
                          >
                            {lesion.data.personal_hx_melanoma.toString()}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-lg font-bold">
                            Family Hx Melanoma
                          </label>
                          <div
                            className="rounded-md bg-gray-300 text-gray-800 font-semibold p-2 h-full"
                            key={Math.random()}
                          >
                            {lesion.data.family_hx_melanoma.toString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </section>
                <section
                  aria-label="right-side-data"
                  className="px-4 grid grid-flow-row-dense grid-cols-1 gap-3"
                >
                  <section id="images">
                    <h5 className="text-xl text-white font-bold bg-slate-500 px-4 py-2 rounded-se-lg rounded-ss-lg shadow-xl">
                      Findings - {index + 1}
                    </h5>
                    <div className="px-4 pt-2 pb-6 rounded-ee-lg rounded-es-lg shadow-xl capitalize">
                      <div className="grid grid-flow-row-dense grid-cols-1 gap-4">
                        {lesion.finding.map((finding, idx) => (
                          <div className="overflow-scroll" key={idx}>
                            <Findings
                              annotation={finding.annotation_data}
                              url={finding.annotation_image.url}
                              title={finding.annotation_image.title}
                              contentType={finding.annotation_image.contentType}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                </section>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default Modal;
