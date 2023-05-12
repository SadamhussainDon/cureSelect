import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

const Dashboard = ({navigation}) => {
  const [patients, setPatients] = useState([]);

  const route = useRoute();
  const email = route.params?.email;

  const handleAddPatient = () => {
    navigation.navigate('AddPatient'); // replace with your add patient component name
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoutView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
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
        <Text style={styles.name}>{email.split('@')[0]}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPatient}>
        <Text style={styles.buttonText}>Add Patient</Text>
      </TouchableOpacity>
      <View style={styles.patientList}>
        {patients.map(patient => (
          <View key={patient.id} style={styles.patientCard}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <Text style={styles.patientDetails}>{patient.age} years old</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
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
