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

<div className="relative w-auto my-6 mx-auto max-w-3xl">
  {/*content*/}
  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    {/*header*/}
    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
      <h3 className="text-3xl font-semibold">Modal Title</h3>
      <button
        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
        onClick={() => props.setShowModal(false)}
      >
        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
          ×
        </span>
      </button>
    </div>
    {/*body*/}
    <div className="relative p-6 flex-auto">
      <p className="my-4 text-slate-500 text-lg leading-relaxed">
        I always felt like I could do anything. That’s the main thing people are
        controlled by! Thoughts- their perception of themselves! They're slowed
        down by their perception of themselves. If you're taught you can’t do
        anything, you won’t do anything. I was taught I could do everything.
      </p>
    </div>
    {/*footer*/}
    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
      <button
        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => props.setShowModal(false)}
      >
        Close
      </button>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => props.setShowModal(false)}
      >
        Save Changes
      </button>
    </div>
  </div>
</div>;
