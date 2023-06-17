// return (

// );

<div className="container mx-auto py-12 text-slate-700 font-mono">
  <h4 className="text-2xl font-bold ">Document general information :</h4>
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
                <span className="text-gray-800">{idx !== 0 ? "," : ""}</span>
              </span>
            ))}{" "}
            -{" "}
            <span key={physician.displayName}>{physician.displayName} - </span>
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
        {imageType}
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
                <span className="text-gray-800">{idx !== 0 ? "," : ""}</span>
              </span>
            ))}{" "}
            -{" "}
            <span key={physician.displayName}>{physician.displayName} - </span>
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
                  <label className="text-lg font-bold">Document Title :</label>
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
  </div>
  <div className="flex justify-end items-center">
    <button className="bg-gray-800 text-white p-2 text-lg font-semibold rounded-lg">
      Create Report
    </button>
  </div>
</div>;
