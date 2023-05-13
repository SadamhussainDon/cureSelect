import Realm from 'realm';

const PatientSchema = {
  name: 'Patient',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    gender: 'string',
    dob: 'date',
  },
};

const UserSchema = {
  name: 'User',
  properties: {
    email: 'string',
    password: 'string',
  },
};

async function openRealm() {
  const realm = await Realm.open({
    schema: [PatientSchema, UserSchema],
  });
  return realm;
}
// Define a function to add a new patient to the database
export const addPatientToRealm = async patient => {
  const realm = await openRealm();
  realm.write(() => {
    realm.create('Patient', patient);
  });
};

export const GetPatientToRealm = async () => {
  const realm = await openRealm();
  const patients = realm.objects('Patient');
  return patients;
};

export const addUserToRealm = async user => {
  console.log('Adding user to realm:', user);
  const realm = await openRealm();
  realm.write(() => {
    realm.create('User', user);
  });
};

export const getUserFromRealm = async email => {
  const realm = await openRealm();
  const user = realm.objects('User').filtered(`email = "${email}"`);
  return user[0];
};
// Export the database reference and add patient function for use in other components
