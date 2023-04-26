import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./home.css";
import RegisteredTable from "../../Components/RegisteredTable/RegisteredTable";

import { getAllRegisteredUser } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);

  useEffect(() => {
    (async () => {
      getAllRegisteredUser(dispatch, axiosJWT);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container mt-4">
      <RegisteredTable
        accessToken={user?.accessToken}
        jwt={axiosJWT}
        user={user}
      ></RegisteredTable>
    </main>
  );
};

export default HomePage;
