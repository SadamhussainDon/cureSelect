import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {addUserToRealm} from '../../reducer/Realm';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = () => {
    // Email validation regular expression
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = () => {
    // Password validation regular expression
    const regex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/;
    return regex.test(password);
  };

  const handleLogin = async () => {
    if (validateEmail() && validatePassword()) {
      // Perform login action
      console.log('Logged in!');
      const user = {
        email: email,
        password: password,
      };
      await addUserToRealm(user);
      await AsyncStorage.setItem('userEmail', email);

      console.log('User added successfully');
      navigation.navigate('Dashboard'); // Navigating to the Dashboard screen and passing email and route as params
    } else {
      // Show error message
      console.log('Invalid email or password!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!validateEmail() && email !== '' && (
        <Text style={styles.error}>Please enter a valid email address</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!validatePassword() && password !== '' && (
        <Text style={styles.error}>
          Password must be at least 7 characters long and contain alphanumeric
          characters
        </Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    width: '80%',
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

export default Login;
