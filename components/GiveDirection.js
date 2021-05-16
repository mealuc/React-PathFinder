import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import { SafeAreaView } from 'react-navigation';



const GiveDirection = () => {
    const [targetlongitude, settargetlongitude] = useState([]);
    const [targetlatitude, settargetlatitude] = useState([]);
    useEffect(() => {

    }, [])
    return (
            <View style={styles.mapcontainer}>
                <MapView
                    showsMyLocationButton={true}
                    provider={PROVIDER_GOOGLE}///////// remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: Number(41.2351403),
                        longitude: Number(32.6669429),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    followsUserLocation={true}
                    showsUserLocation={true}
                >
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