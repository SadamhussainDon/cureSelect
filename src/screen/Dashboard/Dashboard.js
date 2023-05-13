import React, {useState, useLayoutEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {GetPatientToRealm} from '../../reducer/Realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getPatients} from '../../reducer/patientReducer';
import {useDispatch} from 'react-redux';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch();
  const [patients, setPatients] = useState([]);
  const [user, setUser] = useState(null);
  const [people, setPeople] = useState([]);

  // This function fetches the data from Realm and sets the state.
  const fetchData = async () => {
    const results = await GetPatientToRealm();
    setPeople(results);
    const userEmail = await AsyncStorage.getItem('userEmail');
    setUser(userEmail);
  };

  // This hook will run every time the screen comes into focus.
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  const handleAddPatient = () => {
    navigation.navigate('AddPatient');
  };

  // Logout function
  const logout = async () => {
    // Remove the user's email from async storage or other secure storage mechanism
    await AsyncStorage.removeItem('userEmail');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutView}>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}>
          <Image
            style={styles.logoutImage}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828427.png',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.userCard}>
        <Text style={styles.name}>{user}</Text>
        <Text style={styles.email}>{user}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
      <View style={styles.patientList}>
        {people && people.map(patient => (
          <View key={patient.id} style={styles.patientCard}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientDetails}>
              {new Date(patient.dob).toLocaleDateString()}
            </Text>
            <Text style={styles.patientDetails}>{patient.gender}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  userCard: {
    width: '80%',
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
  },
  addButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#0080ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  patientList: {
    width: '80%',
    alignItems: 'flex-start',
  },
  patientCard: {
    width: '100%',
    height: 80,
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  patientDetails: {
    fontSize: 14,
  },
  logoutImage: {
    width: 25,
    height: 25,
  },
  logoutView: {
    width: '90%',
    height: 35,
    alignItems: 'flex-end',
  },
});

export default Dashboard;
