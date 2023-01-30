import React, { useReducer, useContext, useEffect, useState } from 'react';
import reducer from './reducer';
import axios from 'axios';

import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  SET_EDIT_JOB,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  DELETE_JOB_SUCCESS,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,

} from './actions';
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const location = localStorage.getItem('location')
const initialState = {
  token: token,
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user,
  userLocation: '',
  showSidebar: false,
  isEditing: false,
  editJobId: '',
  position: '',
  company: '',
  jobLocation: location,
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  });
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config;
    },
    (error) => {
      // console.log(error.response)

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


  //DISPLAY AN ALERT 
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };



  // CLEAR AN ALERT
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };



  // CLEAR VALUES
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // ADD USER TO THE LOCAL STORAGE
  const addUserrToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('location', JSON.stringify(location));
  }


  //REMOVE USER FROM THE LOCAL STORAGE
  const removeUserFromLocalStorage = ({ user, token, location }) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  }



  //LOGIN OR REGISTER AN USER
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, location, token } = data;
      localStorage.setItem('token', token);
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, location, alertText, token },


      });
      addUserrToLocalStorage({ user, token, location })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };


  //UPDATE AN USER
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await axios.patch('api/v1/auth/updateUser', currentUser, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      });
      console.log(data)
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });

    } catch (error) {

      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: "please try again" },
      });

    }
    clearAlert();
  };


  // LOG OUT AS AN USER
  const logoutUser = async () => {
    await axios.get('api/v1/auth/logout');
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };



  //CREATE AN JOB
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      // 
      // await authFetch.post('/jobs', {
      //   position,
      //   company,
      //   jobLocation,
      //   jobType,
      //   status,
      // });
      await axios.post('api/v1/job', { position, company, jobLocation, jobType, status },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          }
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



  // GET ALL JOBS
  const getJobs = async () => {
    const { page, search, searchStatus, searchType, sort } = state;

    let url = `api/v1/job?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      });
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




  //HANDLE CHANGE
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };


  //SET EDITJOB FUNCTION FROM JOB COMPONENT
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };


  // EDIT A JOB

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status, editJobId } = state;
      // await authFetch.patch(`/jobs/${editJobId}`, {
      //   company,
      //   position,
      //   jobLocation,
      //   jobType,
      //   status,
      // });

      await axios.patch(`api/v1/job/${editJobId}`,
        {
          position,
          company,
          jobLocation,
          jobType,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          }
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


  // const editJob = async () => {
  //   dispatch({ type: EDIT_JOB_BEGIN });

  //   try {
  //     const { position, company, jobLocation, jobType, status, editJobId } = state;
  //     // await authFetch.patch(`/jobs/${state.editJobId}`, {
  //     //   company,
  //     //   position,
  //     //   jobLocation,
  //     //   jobType,
  //     //   status,
  //     // });
  //     await axios.patch(`api/v1/job/${editJobId}`,
  //       {
  //         position,
  //         company,
  //         jobLocation,
  //         jobType,
  //         status
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${state.token}`,
  //         }
  //       });
  //     dispatch({ type: EDIT_JOB_SUCCESS });
  //     dispatch({ type: CLEAR_VALUES });
  //   } catch (error) {
  //     if (error.response.status === 401) return;
  //     dispatch({
  //       type: EDIT_JOB_ERROR,
  //       payload: { msg: error.response.data.msg },
  //     });
  //   }
  //   clearAlert();
  // };

  // DELETE A JOB
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      // await authFetch.delete(`/jobs/${jobId}`);
      const { editJobId } = state
      await axios.delete(`api/v1/job/${jobId}`,

        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          }
        });
      dispatch({ type: DELETE_JOB_SUCCESS });
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

//Show Status
const showStats = async () => {
  dispatch({ type: SHOW_STATS_BEGIN });
  try {
    // const { data } = await authFetch('/jobs/stats');
    const { data } = await axios.get('api/v1/job/stats',  {
      headers: {
        Authorization: `Bearer ${state.token}`,
      }
    });
    console.log('Status data',data)
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

//CLEAR FILTER
const clearFilters = () => {
  dispatch({ type: CLEAR_FILTERS });
  console.log("clear filter!")
};

//CHANGE PAGE
const changePage = (page) => {
  dispatch({ type: CHANGE_PAGE, payload: { page } });
};
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        toggleSidebar,
        updateUser,
        createJob,
        handleChange,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        clearFilters,
        changePage,
        showStats

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
