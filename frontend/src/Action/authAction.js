import { authConstants } from "./constants";
import { toast } from "react-hot-toast";
import axios from "axios";

//working
export const Login = (data) => {
  return async (dispatch) => {
    console.log(data);
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post("http://localhost:8070/user/", data);
      if (res.status === 201) {
        const token = res.data.token;
        const user = res.data.user;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(`Login Success, Welcome ${user.fullName}`, {
          id: "login",
        });

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            user,
            token,
          },
        });
      } else if (res.status === 404) {
        toast.error("Invalid Password..!");
        dispatch({
          type: authConstants.LOGIN_FALIURE,
        });
      } else if (res.status === 405) {
        toast.error("No user under this email..!");
        dispatch({
          type: authConstants.LOGIN_FALIURE,
        });
      }
    } catch (error) {
      toast.error("somthing went wrong.!");
      dispatch({ type: authConstants.LOGIN_FALIURE });
    }
  };
};
//working
export const Register = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.REGISTER_REQUEST });
      const res = await axios.post("http://localhost:8070/user/signup", data);
      if (res.status === 201) {
        dispatch({
          type: authConstants.REGISTER_SUCCESS,
          payload: res.data.payload,
        });
        toast.success("Registration Succefull..!");
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: authConstants.REGISTER_FALIURE,
        });
        toast.error("Registration error..!");
      } else if (error.response.status === 404) {
        dispatch({
          type: authConstants.REGISTER_FALIURE,
        });
        toast.error("User already exist..!");
      } else {
        toast.error("Somthing went wrong..!");
        dispatch({
          type: authConstants.REGISTER_FALIURE,
        });
      }
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    localStorage.clear();

    toast.success("Logout successfull..!", {
      id: "logout",
    });
    dispatch({
      type: authConstants.LOGOUT_SUCCESS,
    });
  };
};

//working
export const isLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      }
    } else {
      dispatch({
        type: authConstants.LOGIN_FALIURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};
