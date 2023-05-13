import {addPatientToRealm, GetPatientToRealm} from '../reducer/Realm';

// Define action types
const ADD_PATIENT = 'ADD_PATIENT';
const GET_PATIENTS = 'GET_PATIENTS';

// Define action creators
export const addPatient = patient => {
  return async dispatch => {
    await addPatientToRealm(patient);
    dispatch({type: ADD_PATIENT, payload: patient});
  };
};

export const getPatients = async () => {
  return async dispatch => {
    const patients = await GetPatientToRealm();
    await dispatch({type: GET_PATIENTS, payload: patients});
  };
};

// Define the patient reducer
const patientReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PATIENT:
      console.log('Adding patient to state:', action.payload);
      return [...state, action.payload];
    case GET_PATIENTS:
      console.log('Getting patients:', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default patientReducer;
