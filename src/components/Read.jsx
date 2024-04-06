import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShowUser, deleteUser } from "../store/UserdetailSlice";
import CustomModal from "./CustomModal";

function Read() {
  const [id, setId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const [radioData, setRadioData] = useState("");
  const dispatch = useDispatch();
  const { users, loading, serachuser } = useSelector((state) => state.app);
  // const selector = useSelector(state)
  useEffect(() => {
    dispatch(ShowUser());
  }, []);

  const handleShowPopup = (user) => {
    setId(user.id);
    setShowPopup(true);
    document.querySelector("body").style.overflow = "hidden";
  };

  if (loading) {
    return (
      <h2 className="flex items-center justify-center text-lg">Loading...</h2>
    );
  }
  return (
    <div className=" bg-slate-400 flex justify-center">
      <div className=" ">
        <h2 className="mb-3">All Data</h2>

        <input
          className="form-check-input"
          name="gender"
          type="radio"
          id="All"
          value={""}
          checked={radioData === ""}
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label className="mr-2" htmlFor="male">
          All
        </label>
        <input
          className="form-check-input"
          name="gender"
          value="Male"
          type="radio"
          id="male"
          checked={radioData === "Male"}
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label className="ml-2" htmlFor="male">
          Male
        </label>

        <input
          className="ml-4"
          name="gender"
          value="Female"
          type="radio"
          id="female"
          checked={radioData === "Female"}
          onChange={(e) => setRadioData(e.target.value)}
        />
        <label className="ml-2" htmlFor="female">
          Female
        </label>

        {users &&
          users
            .filter((item) => {
              if (serachuser.length === 0) {
                return item;
              } else {
                return item.name
                  .toLowerCase()
                  .includes(serachuser.toLowerCase());
              }
            })
            .filter((item) => {
              if (radioData === "Female") {
                return item.gender === radioData;
              } else if (radioData === "Male") {
                return item.gender === radioData;
              } else {
                return item;
              }
            })
            .map((user) => (
              <div
                className="bg-white rounded-lg mx-auto w-96  mb-3 p-3 text-center "
                key={user.id}
              >
                <h5 className="my-1">Name: {user.name}</h5>
                <h6 className="my-1">Email: {user.email}</h6>
                <p className="my-1  mb-4">Gender:{user.gender}</p>
                <button
                  className="p-2 my-1 rounded-md mr-2 bg-slate-400 text-[13px] hover:bg-slate-300 transition-all duration-300 "
                  onClick={() => handleShowPopup(user)}
                >
                  View
                </button>
                <Link
                  to={`/edit/${user.id}`}
                  className="p-2 my-1 rounded-md mr-2 bg-slate-400 text-[13px] hover:bg-slate-300 transition-all duration-300 "
                >
                  Update
                </Link>
                <Link
                  to="/read"
                  className="p-2 my-1 rounded-md bg-slate-400 text-[13px] hover:bg-slate-300 transition-all duration-300 "
                  onClick={() => dispatch(deleteUser(user.id))}
                >
                  Delete
                </Link>
              </div>
            ))}
        {showPopup && <CustomModal id={id} setShowPopup={setShowPopup} />}
      </div>
    </div>
  );
}

export default Read;
