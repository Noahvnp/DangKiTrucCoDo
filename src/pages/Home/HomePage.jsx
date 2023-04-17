import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./home.css";
import RegisterUser from "../RegisterUser/RegisterUser";
import RegisteredTable from "../../Components/RegisteredTable/RegisteredTable";

import {
  getAllRegisteredUser,
} from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  // const userList = useSelector((state) => state.user.users?.allUsers);
  const registeredTable = useSelector(
    (state) => state.registeredUser?.registeredList.allRegisteredList
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    (async () => {
      getAllRegisteredUser(dispatch, axiosJWT);
    })();
  }, []);

  return (
    <main className="container mt-4">
      {user ? (
        <RegisterUser
          accessToken={user?.accessToken}
          jwt={axiosJWT}
          id={user?._id}
        ></RegisterUser>
      ) : null}
      <RegisteredTable></RegisteredTable>
    </main>
  );
};

export default HomePage;
