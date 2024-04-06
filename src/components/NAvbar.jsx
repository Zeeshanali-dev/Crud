import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ShowUser, searchUser } from "../store/UserdetailSlice";

function NAvbar() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.app);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(searchUser(searchData));
  }, [searchData]);

  return (
    <>
      <div className="">
        <nav className="w-full px-2 py-3 bg-slate-300 flex item-center justify-center">
          <div className="w-1/2 flex items-center">
            <div className="mr-3">RTK</div>
            <ul className="flex justify-center">
              <li>
                <Link to="/" className="mr-2">
                  Create Post
                </Link>
              </li>
              <li>
                <Link to="/read" className="">
                  All Post ({users.length})
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/2 flex">
            <input
              className=" m-2 w-full rounded-lg outline-none border-none py-3 px-4"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </nav>
      </div>
    </>
  );
}

export default NAvbar;
