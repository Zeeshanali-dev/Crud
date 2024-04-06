import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateUser } from "../store/UserdetailSlice";

function Update() {
  const { id } = useParams();
  const { users, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [update, setUpdate] = useState();
  console.log(update);

  useEffect(() => {
    if (id) {
      const singleUser = users.filter((user) => user.id === id);
      setUpdate(singleUser[0]);
    }
  }, []);

  const newData = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(UpdateUser(update));
    navigate("/read");
  };
  return (
    <div className="bg-slate-400">
      <div className="mx-auto flex flex-col">
        <h2 className="my-2 flex mx-auto">Edit the data</h2>
        <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
          <div className="mb-3 flex flex-col">
            <label className="">Name</label>
            <input
              type="text"
              name="name"
              className="px-2 w-full"
              value={update && update.name}
              onChange={newData}
              required
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="">Email</label>
            <input
              type="email"
              name="email"
              className="px-2 w-full"
              value={update && update.email}
              onChange={newData}
              required
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label className="">Age</label>
            <input
              type="text"
              name="age"
              className="px-2 w-full"
              value={update && update.age}
              onChange={newData}
              required
            />
          </div>
          <div className="flex ">
            <div className="mb-3 flex">
              <input
                className="form-check-input"
                name="gender"
                value="Male"
                type="radio"
                id="male"
                checked={update && update.gender === "Male"}
                onChange={newData}
                required
              />
              <label className="ml-2" htmlFor="male">
                Male
              </label>
            </div>
            <div className="mb-3 ">
              <input
                className="ml-4"
                name="gender"
                value="Female"
                type="radio"
                id="female"
                checked={update && update.gender === "Female"}
                onChange={newData}
              />
              <label className="ml-2" htmlFor="female">
                Female
              </label>
            </div>
          </div>

          <button type="submit" className="">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
