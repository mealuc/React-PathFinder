import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, SafeAreaView } from 'react-native';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const getItems = (currentIndex, setter) => {
    firebase.database().ref(`/coordinates/${currentIndex}`)
        .orderByChild('description')
        .once('value', snapshot => {
            setter(snapshot.val());
        });
}

const GiveDirection = ({ currentIndex, LastItem: { latitude: userLatitude, longitude: userLongitude },setPage }) => {
    const [targetCoordinate, setTargetCoordinate] = useState({ longitude: 41.2351403, latitude: 32.6669429 });
    useEffect(() => {
        getItems(currentIndex, setTargetCoordinate);
    }, [currentIndex, setTargetCoordinate])
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
                    title={"Destination"}
                    description={"Destination"}
                    coordinate={{
                        latitude: targetCoordinate.latitude,
                        longitude: targetCoordinate.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }} />
                <MapViewDirections
                    apikey={"AIzaSyCbar4Awt3fCuYdoDpa8zxrjUyeTQjQDkU"}
                    origin={{ latitude: userLatitude, longitude: userLongitude }}
                    destination={{
                        latitude: targetCoordinate.latitude,
                        longitude: targetCoordinate.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121
                    }}
                    strokeWidth={6}
                    strokeColor="lightblue"
                />
            </MapView>
            <View style={styles.BottomTab}>
                <TouchableOpacity style={styles.BottomTabButton} onPress={() => setPage("gotosearch")}>
            <Text style={{ color: '#1B9CFC' }}>Search</Text>
          </TouchableOpacity>
                <TouchableOpacity style={styles.BottomTabButton} onPress={() => setPage("articles")} >
                    <Text style={{ color: '#1B9CFC' }}>Home</Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mapcontainer: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    BottomTab: {
        width: "100%",
        justifyContent: 'space-around',
        padding: 20,
        height:60,
        alignItems: 'flex-end',
        backgroundColor: 'red',
        flexDirection:'row',
        marginTop:'auto',
      },
      BottomTabButton:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black',
        borderRadius:10,
        borderColor:'black',
        padding:7,
      },
})
//AIzaSyCbar4Awt3fCuYdoDpa8zxrjUyeTQjQDkU
export default GiveDirection;