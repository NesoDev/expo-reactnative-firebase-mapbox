import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker } from 'react-native-maps';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { logoutUser } from '../api/firebase-api';
import { FIREBASE_AUTH } from '../core/config';
import { useNavigation } from '@react-navigation/native';

const auth = FIREBASE_AUTH;

export default function Main() {
  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      navigation.replace('StartScreen');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#dcff7a" style="dark" />

      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenido, {userName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image style={styles.logoutIcon} source={require('../assets/icon-logout.png')} />
          <Text style={{ color: 'white' }}>Salir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bodyContainer}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: -14.0678,
            longitude: -75.7286,
            latitudeDelta: 0.004,
            longitudeDelta: 0.004
          }}
        >
          <Marker
            coordinate={{ latitude: -14.0678, longitude: -75.7286, }}
            title="Marker Title"
            description="Marker Description"
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#252525'
  },
  header: {
    width: '100%',
    height: '8%',
    backgroundColor: '#252525',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  greeting: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  logoutButton: {
    backgroundColor: '#3b3942',
    borderRadius: 8,
    padding: 8,
    paddingRight: 12,
    flexDirection: 'row',
    gap: 8
  },
  logoutIcon: {
    width: 20,
    height: 20,
  },
  bodyContainer: {
    width: '95%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },  
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 25
  }

});
