import React from "react";

const Popup = ({
  popupMessage,
  setPopupMessage,
}: {
  popupMessage: string;
  setPopupMessage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const closeModal = () => {
    console.log("closed Modal");
    setPopupMessage("");
  };
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-72 sm:w-full bg-white outline-none focus:outline-none">
          {/*body*/}
          <div className="relative px-4 flex-auto">
            <p className="my-4 text-black text-lg leading-relaxed">
              {popupMessage}
            </p>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-center px-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-600 cursor-pointer background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 z-50"
              type="button"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Popup;
