import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';
import GotoSearch from './SearchItem';

const getItems = (currentIndex,setter) => {
    firebase.database().ref(`/coordinates/${currentIndex}`)
      .orderByChild('description')
      .once('value', snapshot => {
        setter(snapshot.val());  
      });
  }

const GiveDirection = ({currentIndex}) => {
    const [targetCoordinate, setTargetCoordinate] = useState({longitude:41.2351403,latitude:32.6669429});
    useEffect(() => {
        getItems(currentIndex,setTargetCoordinate);
    }, [currentIndex,setTargetCoordinate])

    return (
            <View style={styles.mapcontainer}>            
                <MapView
                    showsMyLocationButton={true}
                    provider={PROVIDER_GOOGLE}//remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 41.2351403,
                        longitude: 32.6669429,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    followsUserLocation={true}
                    showsUserLocation={true}
                >
                    <Marker
                title={"Here"}
                description={"MyHome"}
                coordinate={{
                  latitude: targetCoordinate.latitude,
                  longitude: targetCoordinate.longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }} />
                </MapView>                
            </View>
    );
};

const styles = StyleSheet.create({
    mapcontainer: {
        flex:1,
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: 400,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})

export default GiveDirection;