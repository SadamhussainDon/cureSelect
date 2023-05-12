import Realm from 'realm';

const PatientSchema = {
  schemaVersion: 1, // update the schema version here
  name: 'Patient',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    gender: 'string',
    dob: 'date',
  },
};



// Open the database and create a reference to the patient objects
const cureRealm = new Realm({
  schema: [PatientSchema],
});

// Define a function to add a new patient to the database
const addPatientToRealm = patient => {
  cureRealm.write(() => {
    cureRealm.create('Patient', patient);
  });
};

// Export the database reference and add patient function for use in other components
export {cureRealm, addPatientToRealm};
