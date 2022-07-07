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
  // ADMIN
  FETCH_ADMIN_BEGIN,
  FETCH_ADMIN_SUCCESS,
  UPDATE_PRICE_BEGIN,
  UPDATE_PRICE_SUCCESS,
  UPDATE_PRICE_ERROR,
  VALIDATE_USER_BEGIN,
  VALIDATE_USER_SUCCESS,
  VALIDATE_USER_ERROR,
  SEARCH_USER_TRANSACTION_BEGIN,
  SEARCH_USER_TRANSACTION_SUCCESS,
  SEARCH_USER_TRANSACTION_ERROR,
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
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
  FUND_USER_WALLET_BEGIN,
  FUND_USER_WALLET_SUCCESS,
  FUND_USER_WALLET_ERROR,
} from "./actions";

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
  // ADMIN
  userAccount: "",
  userSearchBalance: "",
  isValidated: false,
  validatedName: "",
  userTransactions: [],
  myUsers: [],
  dataPrices: [],
  availableServices: {},
  newPrice: "",
  newResellerPrice: "",
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
    // baseURL: "https://oniboykonnect.herokuapp.com/api/v1",
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
  const fetchAdmin = async () => {
    dispatch({ type: FETCH_ADMIN_BEGIN });
    try {
      const { data } = await authFetch.get("/admin");
      // console.log(data.adminInfo);
      dispatch({ type: FETCH_ADMIN_SUCCESS, payload: data.adminInfo });
    } catch (error) {
      logoutUser();
    }
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
  const updatePrice = async (dataId) => {
    const { newPrice, newResellerPrice } = state;
    if (!newPrice || !newResellerPrice) return displayAlert();
    dispatch({ type: UPDATE_PRICE_BEGIN });

    try {
      const { data } = await authFetch.post("/admin/updatePrices", {
        dataId,
        newPrice: { price: newPrice, resellerPrice: newResellerPrice },
      });
      dispatch({ type: UPDATE_PRICE_SUCCESS, payload: { msg: data.msg } });
      fetchAdmin();
    } catch (error) {
      dispatch({ type: UPDATE_PRICE_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };
  const validateUser = async () => {
    const { userAccount } = state;
    if (!userAccount) return displayAlert();
    dispatch({ type: VALIDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.post("/admin/validateUser", {
        userAccount,
      });
      dispatch({ type: VALIDATE_USER_SUCCESS, payload: { msg: data.msg } });
    } catch (error) {
      dispatch({ type: VALIDATE_USER_ERROR, payload: error.response.data.msg });
    }
    clearAlert();
  };
  const fundUserWallet = async () => {
    const { amount, userAccount } = state;
    if (!amount || !userAccount) return displayAlert();
    dispatch({ type: FUND_USER_WALLET_BEGIN });
    try {
      const { data } = await authFetch.post("/admin/fundWallet", {
        amount,
        userAccount,
      });
      dispatch({ type: FUND_USER_WALLET_SUCCESS, payload: { msg: data.msg } });
    } catch (error) {
      dispatch({
        type: FUND_USER_WALLET_ERROR,
        payload: error.response.data.msg,
      });
    }
    clearAlert();
  };
  const fetchUserTransaction = async () => {
    const { isAdmin, search, userAccount } = state;
    let endPont = "/admin/fetchTransactions?";
    if (!isAdmin) return;
    if (search) endPont = `${endPont}number=${search}`;
    if (userAccount) endPont = endPont + `&userName=${userAccount}`;
    dispatch({ type: SEARCH_USER_TRANSACTION_BEGIN });
    try {
      const { data } = await authFetch(endPont);
      console.log(data.transactions);
      dispatch({
        type: SEARCH_USER_TRANSACTION_SUCCESS,
        payload: { transactions: data.transactions },
      });
    } catch (error) {
      dispatch({ type: SEARCH_USER_TRANSACTION_ERROR });
    }
  };
  const fetchUsers = async () => {
    const { userAccount, userSearchBalance } = state;
    let endPoint = "/admin/fetchUsers?";
    if (userAccount) endPoint = `${endPoint}userName=${userAccount}`;
    if (userSearchBalance)
      endPoint = `${endPoint}&balance=${userSearchBalance}`;
    dispatch({ type: FETCH_USERS_BEGIN });
    try {
      const { data } = await authFetch(endPoint);
      dispatch({ type: FETCH_USERS_SUCCESS, payload: { users: data.users } });
    } catch (error) {
      dispatch({ type: FETCH_USERS_ERROR });
    }
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
        validateUser,

        handleChange,
        buyAirtime,
        buyData,
        forgetPassword,
        fetchAdmin,
        updatePrice,
        fundUserWallet,
        fetchUserTransaction,
        fetchUsers,
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
