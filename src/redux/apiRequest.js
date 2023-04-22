import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logOutFailure,
  logOutStart,
  logOutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailure,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";
import {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  getRegisteredListFailure,
  getRegisteredListStart,
  getRegisteredListSuccess,
  deleteStart,
  deleteSuccess,
  deleteFailure,
} from "./registeredUserSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get("/v1/user/", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailure());
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/v1/user/" + id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailure(err.response.data));
  }
};

export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/v1/auth/logout", id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logOutSuccess());
    navigate("/");
  } catch (err) {
    dispatch(logOutFailure());
  }
};

export const getAllRegisteredUser = async (dispatch, axiosJWT) => {
  dispatch(getRegisteredListStart());
  try {
    const res = await axiosJWT.get("/v1/register/list");
    const result = await res.json;
    dispatch(getRegisteredListSuccess(result));
    return result;
  } catch (err) {
    dispatch(getRegisteredListFailure());
  }
};

export const register = async (
  accessToken,
  user,
  dispatch,
  id,
  navigate,
  axiosJWT
) => {
  dispatch(registerUserStart());
  try {
    await axiosJWT.post("/v1/register/signup/" + id, user, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(registerUserSuccess());
    navigate("/");
  } catch (err) {
    dispatch(registerUserFailure());
  }
};

export const updateRegisterUser = async (
  accessToken,
  user,
  dispatch,
  id,
  navigate,
  axiosJWT
) => {
  try {
    await axiosJWT.post("/v1/register/" + id + "/update", user, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const deleteRegisterUser = async (
  accessToken,
  dispatch,
  id,
  axiosJWT
) => {
  dispatch(deleteStart());
  try {
    const res = await axiosJWT.delete("/v1/register/" + id + "/delete", {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteSuccess(res.data));
  } catch (err) {
    dispatch(deleteFailure(err.response.data));
  }
};

export const fetchData = async () => {
  try {
    const { data: response } = await axios.get("/v1/register/list");
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
