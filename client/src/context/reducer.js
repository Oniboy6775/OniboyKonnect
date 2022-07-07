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

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload || "Please provide all values!",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    const { dataSubscriptions } = action.payload;
    console.log(
      dataSubscriptions.map(
        (e) => `${e.networkName} ${e.dataVolume} ${e.validity} ₦${e.price}`
      )[0]
    );
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      isAdmin: action.payload.isAdmin,
      dataSubscriptions: action.payload.dataSubscriptions,
      transactions: action.payload.transactions,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
      dataOptions: dataSubscriptions.map(
        (e) => `${e.networkName} ${e.dataVolume} ${e.validity} ₦${e.price}`
      ),
      selectedDataPlan: dataSubscriptions.map(
        (e) => `${e.networkName} ${e.dataVolume} ${e.validity} ₦${e.price}`
      )[0],
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === FETCH_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === FETCH_USER_SUCCESS) {
    const { dataSubscriptions } = action.payload;
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      isAdmin: action.payload.isAdmin,
      dataSubscriptions: action.payload.dataSubscriptions,
      transactions: action.payload.transactions,
      dataOptions: dataSubscriptions.map(
        (e) => `${e.networkName} ${e.dataVolume} ${e.validity} ₦${e.price}`
      ),
      selectedDataPlan: dataSubscriptions.map(
        (e) => `${e.networkName} ${e.dataVolume} ${e.validity} ₦${e.price}`
      )[0],
    };
  }
  // START
  if (action.type === BUY_AIRTIME_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertText: "Buying airtime...",
      alertType: "danger",
    };
  }
  if (action.type === BUY_AIRTIME_SUCCESS) {
    const {
      msg,
      receipt: { transAmount },
    } = action.payload;
    const { user } = state;
    const { userBalance } = user;
    return {
      ...state,
      user: { ...user, userBalance: userBalance - transAmount },
      isLoading: false,
      showAlert: true,
      alertText: msg,
      alertType: "success",
    };
  }
  if (action.type === BUY_AIRTIME_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }

  if (action.type === BUY_DATA_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertText: "Buying data...",
      alertType: "danger",
    };
  }
  if (action.type === BUY_DATA_SUCCESS) {
    const {
      msg,
      receipt: { transAmount },
    } = action.payload;
    const { user } = state;
    const { userBalance } = user;
    return {
      ...state,
      user: { ...user, userBalance: userBalance - transAmount },
      isLoading: false,
      showAlert: true,
      alertText: msg,
      alertType: "success",
    };
  }

  if (action.type === BUY_DATA_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "danger",
    };
  }
  if (action.type === FORGET_PASSWORD_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === FORGET_PASSWORD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.msg,
    };
  }
  if (action.type === FORGET_PASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === FETCH_ADMIN_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === FETCH_ADMIN_SUCCESS) {
    const adminInfo = action.payload;
    return { ...state, isLoading: false, ...adminInfo };
  }
  if (action.type === UPDATE_PRICE_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertText: "Updating...",
      alertType: "danger",
    };
  }
  if (action.type === UPDATE_PRICE_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "success",
      newPrice: "",
      newResellerPrice: "",
    };
  }
  if (action.type === UPDATE_PRICE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      alertType: "danger",
    };
  }
  if (action.type === VALIDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertText: "validating...",
      alertType: "danger",
    };
  }
  if (action.type === VALIDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: "Validated",
      alertType: "success",
      isValidated: true,
      validatedName: action.payload.msg,
    };
  }
  if (action.type === VALIDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      alertType: "danger",
    };
  }
  if (action.type === FUND_USER_WALLET_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertText: "Funding wallet...",
      alertType: "danger",
    };
  }
  if (action.type === FUND_USER_WALLET_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload.msg,
      alertType: "success",
      userAccount: "",
      validatedName: "",
      isValidated: false,
    };
  }
  if (action.type === FUND_USER_WALLET_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertText: action.payload,
      alertType: "danger",
    };
  }

  if (action.type === SEARCH_USER_TRANSACTION_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === SEARCH_USER_TRANSACTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      userTransactions: action.payload.transactions,
    };
  }
  if (action.type === SEARCH_USER_TRANSACTION_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === FETCH_USERS_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === FETCH_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      myUsers: action.payload.users,
    };
  }
  if (action.type === FETCH_USERS_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  //  END
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: "",
      userLocation: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: "success",
      alertText: "User Profile Updated!",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    let initialState = {
      userAccount: "",
      amount: "",
      search: "",
      userSearchBalance: "",
    };
    // const initialState = {
    //   isEditing: false,
    //   editJobId: "",
    //   position: "",
    //   company: "",
    //   jobLocation: state.userLocation,
    //   jobType: "full-time",
    //   status: "pending",
    // };
    if (action.payload === "AIRTIME") {
      initialState = {
        network: "MTN",
        phoneNumber: "",
        amount: "",
      };
    }
    if (action.payload === "DATA") {
      initialState = {
        network: "MTN",
        phoneNumber: "",
      };
    }
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === CREATE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Job Created!",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_JOBS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_JOB) {
    const job = state.jobs.find((job) => job._id === action.payload.id);
    const { _id, position, company, jobLocation, jobType, status } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      company,
      jobLocation,
      jobType,
      status,
    };
  }
  if (action.type === DELETE_JOB_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Job Updated!",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return { ...state, page: action.payload.page };
  }
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
