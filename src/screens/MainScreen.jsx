import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { logoutUser } from '../api/firebase-api';
import { FIREBASE_AUTH } from '../core/config';
import { useNavigation } from '@react-navigation/native';
import LocationInput from '../components/LocationInput';
import { getBestBadRouteTraffic } from '../api/tomtom-api';

const auth = FIREBASE_AUTH;

export default function Main() {
  const [userName, setUserName] = useState('');
  const [inputs, setInputs] = useState([
    { value: '', focused: false, urlFocus: require('../assets/icon-origin-location-focus.png'), urlBlur: require('../assets/icon-origin-location-blur.png') },
    { value: '', focused: false, urlFocus: require('../assets/icon-end-location-focus.png'), urlBlur: require('../assets/icon-end-location-blur.png') }
  ]);
  const [inputsFill, setInputsFill] = useState(false);
  const [start, setStart] = useState({ latitude: 0, longitude: 0 });
  const [end, setEnd] = useState({ latitude: 0, longitude: 0 });
  const [bestRoute, setBestRoute] = useState({ points: [], traffic: 0 });
  const [badRoute, setBadRoute] = useState({ points: [], traffic: 0 });
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
    }
  }, []);

  useEffect(() => {
    const allInputsFilled = inputs.every(input => input.value.trim() !== '');
    setInputsFill(allInputsFilled);
  }, [inputs]);

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      navigation.replace('StartScreen');
    }
  };

  const handleFocus = (index) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) => ({
        ...input,
        focused: i === index,
      }))
    );
  };

  const handleBlur = (index) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) => ({
        ...input,
        focused: i === index ? false : input.focused,
      }))
    );
  };

  const handleChangeText = (text, index) => {
    setInputs((prevInputs) =>
      prevInputs.map((input, i) => ({
        ...input,
        value: i === index ? text : input.value,
      }))
    );
  };

  const calculateRoutes = async () => {
    console.log('Botón calcular rutas presionado');
    const routes = await getBestBadRouteTraffic(inputs[0].value, inputs[1].value);
    setBestRoute(routes.bestRoute)
    setBadRoute(routes.badRoute)
    setStart(routes.start)
    setEnd(routes.end)
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#232a3a" style="light" />

      <View style={styles.header}>
        <Text style={styles.greeting}>Bienvenido, {userName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={{ color: '#fff' }}>Salir</Text>
          <Image style={styles.logoutIcon} source={require('../assets/icon-logout.png')} />
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
          <Polyline
            coordinates={badRoute.points}
            strokeColor="#000"
            strokeWidth={6}  // grosor de la línea
          />
          <Polyline
            coordinates={bestRoute.points}
            strokeColor="#00e5ff"
            strokeWidth={6}  // grosor de la línea
          />
          <Marker
            coordinate={start}
            title={inputs[0].value}
            description="Address Start"
          />


          <Marker
            coordinate={end}
            title={inputs[1].value}
            description="Address End"
          />
        </MapView>
      </View>

      <View style={styles.inputsContainer}>
        {inputs.map((input, index) => (
          <LocationInput
            key={index}
            placeholder={index === 0 ? '¿ En qué lugar iniciamos ?' : '¿ A qué lugar iremos ?'}
            urlFocus={input.urlFocus}
            urlBlur={input.urlBlur}
            onChangeText={(text) => handleChangeText(text, index)}
            value={input.value}
            focused={input.focused}
            onFocus={() => handleFocus(index)}
            onBlur={() => handleBlur(index)}
          />
        ))}
        <View style={[styles.buttonGetRoute, inputsFill && styles.buttonActive, !inputsFill && styles.buttonInactive]}>
          <Text onPress={calculateRoutes} style={styles.textButton}>
            Buscar rutas según tráfico
          </Text>
        </View>
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
    gap: 0,
    backgroundColor: '#242f3e'
  },
  header: {
    position: 'absolute',
    top: 10,
    zIndex: 1,
    width: '95%',
    height: 60,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  greeting: {
    marginLeft: 15,
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  logoutButton: {
    backgroundColor: '#30364a',
    borderRadius: 30,
    padding: 8,
    paddingRight: 10,
    paddingLeft: 13,
    flexDirection: 'row',
    gap: 4
  },
  logoutIcon: {
    width: 20,
    height: 20,
  },
  bodyContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  map: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 0
  },
  inputsContainer: {
    position: 'absolute',
    bottom: -1,
    zIndex: 1,
    width: '100%',
    height: 'auto',
    padding: 17,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#232a3a',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15
  },
  buttonGetRoute: {
    width: '100%',
    height: 60,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  buttonActive: {
    backgroundColor: '#fff',
    //backgroundColor: '#00e5ff',
  },
  textButton: {
    color: '#232a3a',
    fontSize: 18,
    fontWeight: '500'
  },
  buttonInactive: {
    backgroundColor: '#565E6E'
  },
});
