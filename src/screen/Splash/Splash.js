import React, {useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      const fetchSplash = async () => {
        const userEmail = await AsyncStorage.getItem('userEmail');
        console.log('User email:', userEmail);
        if (userEmail === null) {
          navigation.navigate('Login');
        } else {
          navigation.navigate('Dashboard');
        }
      };
      fetchSplash()
    }, 2000); // replace 2000 with the time you want your splash screen to appear
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://cureselecthealthcare.com/assets/images/cureselect-llp-logo-413x182.jpg',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 300,
    height: 100,
  },
});

export default Splash;
