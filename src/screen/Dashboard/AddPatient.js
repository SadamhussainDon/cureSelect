import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Realm from 'realm';
import {cureRealm, addPatientToRealm} from '../../reducer/Realm';
import {addPatient} from '../../reducer/patientReducer';
import {useDispatch} from 'react-redux';

const AddPatient = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [nameError, setNameError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [dobError, setDobError] = useState('');

  const handleAddPatient = async () => {
    let errors = false;

    if (!name) {
      setNameError('Please enter a name');
      errors = true;
    } else {
      setNameError('');
    }

    if (!gender) {
      setGenderError('Please select a gender');
      errors = true;
    } else {
      setGenderError('');
    }

    if (!dob) {
      setDobError('Please enter a date of birth');
      errors = true;
    } else {
      setDobError('');
    }

    if (!errors) {
      // add patient logic here

      const newPatient = {
        id: new Date().getTime(),
        name,
        gender,
        dob: new Date(dob),
      };
      await dispatch(addPatient(newPatient));
      setName('');
      setGender('');
      setDob('');
      console.log('Patient added successfully');
       navigation.reset({
         index: 0,
         routes: [{name: 'Dashboard'}],
       });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={text => setName(text)}
        placeholderTextColor={'#000'}
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={text => setGender(text)}
        placeholderTextColor={'#000'}
      />
      {genderError ? <Text style={styles.error}>{genderError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={text => setDob(text)}
        placeholderTextColor={'#000'}
      />
      {dobError ? <Text style={styles.error}>{dobError}</Text> : null}

      <TouchableOpacity style={styles.addButton} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#000',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  addButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#0080ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddPatient;
