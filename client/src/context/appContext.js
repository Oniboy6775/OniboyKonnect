import React, { useReducer, useContext, useEffect } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  // FETCH_USER_ERROR,
  BUY_AIRTIME_BEGIN,
  BUY_AIRTIME_SUCCESS,
  BUY_AIRTIME_ERROR,
  TRANSACTION_SUCCESS,
  BUY_DATA_BEGIN,
  BUY_DATA_SUCCESS,
  BUY_DATA_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  FORGET_PASSWORD_BEGIN,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  // Known
  dataSubscriptions: [],
  networkOptions: ["MTN", "GLO", "AIRTEL", "9MOBILE"],
  network: "MTN",
  phoneNumber: "",
  amount: 0,
  dataOptions: [],
  selectedDataPlan: "",
  transactions: [],
  amountToCharge: 0,
  airtimeDiscount: 98,
  isAdmin: false,
  // end here
  userLocation: userLocation || "",
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = (message) => {
    dispatch({ type: DISPLAY_ALERT, payload: message });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token, dataSubscriptions, transactions, isAdmin } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          alertText,
          dataSubscriptions,
          transactions,
          isAdmin,
        },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
  const fetchUser = async () => {
    dispatch({ type: FETCH_USER_BEGIN });
    try {
      const { data } = await authFetch.get("/auth/");
      const { user, token, dataSubscriptions, transactions, isAdmin } = data;
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: { user, token, dataSubscriptions, transactions, isAdmin },
      });
      // dispatch({
      //   type: SETUP_USER_SUCCESS,
      //   payload: { user, token, dataSubscriptions, transactions },
      // });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      // logoutUser();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const transactionSuccessful = (amount, type) => {
    dispatch({
      type: TRANSACTION_SUCCESS,
      payload: { amount, type },
    });
  };
  const buyAirtime = async () => {
    dispatch({ type: BUY_AIRTIME_BEGIN });
    const { network, phoneNumber, amount } = state;
    let networkId;
    if (network === "MTN") networkId = "1";
    if (network === "GLO") networkId = "2";
    if (network === "AIRTEL") networkId = "3";
    if (network === "9MOBILE") networkId = "4";
    try {
      const { data } = await authFetch.post("/purchase/airtime", {
        networkId,
        phoneNumber,
        amount,
      });
      const { msg, receipt } = data;
      dispatch({
        type: BUY_AIRTIME_SUCCESS,
        payload: { msg: msg, receipt: receipt },
      });
      clearValues("AIRTIME");
    } catch (error) {
      dispatch({
        type: BUY_AIRTIME_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const buyData = async () => {
    dispatch({ type: BUY_DATA_BEGIN });
    const { network, phoneNumber, selectedDataPlan, dataSubscriptions } = state;
    let networkId;
    if (network === "MTN") networkId = "1";
    if (network === "GLO") networkId = "2";
    if (network === "AIRTEL") networkId = "3";
    if (network === "9MOBILE") networkId = "4";

    const dataInfo = selectedDataPlan.split(" ");
    const dataNetwork = dataInfo[0];
    const dataVolume = dataInfo[1];
    const dataPrice = selectedDataPlan.split("₦")[1];
    // console.log(dataNetwork, dataVolume, dataPrice);
    const dataToBuy = dataSubscriptions.find(
      (e) =>
        e.dataVolume === dataVolume &&
        e.networkName === dataNetwork &&
        e.price === dataPrice
    );
    const { planId } = dataToBuy;

    try {
      const { data } = await authFetch.post("/purchase/data", {
        networkId,
        phoneNumber,
        planId,
      });
      const { msg, receipt } = data;
      dispatch({
        type: BUY_DATA_SUCCESS,
        payload: { msg: msg, receipt: receipt },
      });
      clearValues("DATA");
    } catch (error) {
      dispatch({
        type: BUY_DATA_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
  const forgetPassword = async (email) => {
    dispatch({ type: FORGET_PASSWORD_BEGIN });
    try {
      const { data } = await authFetch.post("/auth/forgetPassword", { email });
      console.log(data);
      dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: { msg: data.msg } });
    } catch (error) {
      dispatch({
        type: FORGET_PASSWORD_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };
  const clearValues = (type) => {
    dispatch({ type: CLEAR_VALUES, payload: type });
  };
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        buyAirtime,
        buyData,
        forgetPassword,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
