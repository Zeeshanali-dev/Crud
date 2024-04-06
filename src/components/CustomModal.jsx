import React from "react";
import { useSelector } from "react-redux";

function CustomModal({ id, setShowPopup }) {
  const { users } = useSelector((state) => state.app);

  const singleUser = users.filter((user) => user.id === id);
  console.log(singleUser[0]);
  const OneUser = singleUser[0];

  const hidePopup = () => {
    setShowPopup(false);
    document.querySelector("body").style.overflow = "auto";
  };
  return (
    <>
      <div className="fixed z-0 inset-0 flex justify-center items-center  bg-slate-600 opacity-80"></div>
      <div className="bg-white rounded-sm py-4 px-3 w-[300px] h-[250px] fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
        <div className="flex justify-between items-center pb-1 border-b-2">
          <h2>User Detail</h2>
          <span onClick={hidePopup} className="cursor-pointer">
            ❌
          </span>
        </div>

        {Object.entries(OneUser).map(([key, value]) => (
          <div
            className="flex justify-between items-center rounded-lg my-3"
            key={key}
          >
            <h2>{key.toUpperCase()}</h2>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default CustomModal;
