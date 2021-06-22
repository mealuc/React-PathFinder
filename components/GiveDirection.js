import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, LogBox } from 'react-native';
import * as firebase from 'firebase';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const getItems = (currentIndex, setter) => {
    firebase.database().ref(`/coordinates/${currentIndex}`)
        .orderByChild('description')
        .once('value', snapshot => {
            setter(snapshot.val());
        });
}

const GiveDirection = ({ currentIndex, LastItem: { latitude: userLatitude, longitude: userLongitude }, setPage }) => {
    const [targetCoordinate, setTargetCoordinate] = useState({ longitude: userLatitude, latitude: userLongitude });
    useEffect(() => {
        getItems(currentIndex, setTargetCoordinate);
        LogBox.ignoreLogs(['MapViewDirections Error: Error on GMAPS route request: ZERO_RESULTS']);
    }, [currentIndex, setTargetCoordinate])
    return (
        <View style={styles.mapcontainer}>
            <MapView
                showsMyLocationButton={true}
                provider={PROVIDER_GOOGLE}//remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: userLatitude,
                    longitude: userLongitude,
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
                    <Image style={styles.buttonImage} source={require('../images/search.webp')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.BottomTabButton} onPress={() => setPage("articles")} >
                    <Image style={styles.buttonImage} source={require('../images/home.png')} />
                </TouchableOpacity>
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
        height: 60,
        alignItems: 'flex-end',
        backgroundColor: 'gray',
        flexDirection: 'row',
        marginTop: 'auto',
    },
    BottomTabButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderLeftWidth: 5,
        height: 40,
        padding: 3,
    },
    buttonImage: {
        width: 35,
        height: 36,
    }
})
//AIzaSyCbar4Awt3fCuYdoDpa8zxrjUyeTQjQDkU
export default GiveDirection;