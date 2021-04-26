import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as firebase from 'firebase';
import { SearchBar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE,Marker,AnimatedRegion } from 'react-native-maps';
class Articles extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      search: '',
      latitude: '',
      longitude: ''
    }
  }

  updateSearch = (search) => {
    this.setState({ search });
  }
  componentDidMount = async () => {
    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      'title': 'Deneme',
      'message': 'Konumu Ver!'
    });
    //alert(response);
    /*Geolocation.getCurrentPosition(
      (position) => {      
        let { coords: { latitude, longitude } } = position;
        this.setState({ latitude, longitude });
        console.log(position)
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 30000}
    );*/
    const useruid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + useruid).once('value')
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({ name: data.name, email: data.email });
      });
      Geolocation.watchPosition(
        position =>{
          const { coords : {latitude,longitude}} = position;
          this.setState({latitude,longitude})         
        },
        error =>{
          console.log(error);
        },
        {enableHighAccuracy:true}
      );
  }

  stop_observing =() =>{
    Geolocation.stopObserving();
  };

  render() {
    const { search, latitude, longitude, email, name } = this.state;
    return (
      <View style={styles.container}>
        <SearchBar style={styles.searchbar}
          placeholder="Search something..."
          onChangeText={this.updateSearch}
          value={search}
        />
        <Text>
          latitude:{latitude}
        </Text>
        <Text>
          longitude:{longitude}
        </Text>
        <View style={styles.articleContainer}>         
          <View style={styles.mapcontainer}>
            <MapView
              showsMyLocationButton={true}
              provider={PROVIDER_GOOGLE}// remove if not using Google Maps
              style={styles.map}
              region={{
                latitude:  Number(41.2351403),
                longitude: Number(32.6669429),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}             
              followsUserLocation={true}
              showsUserLocation={true}
            >
              <Marker
              draggable={true}              
              onDragEnd={(e)=>console.log(e.nativeEvent.coordinate)}
              title={"Here"}
              description={"MyHome"}
              coordinate={{
                latitude: 41.2351403,
                longitude: 32.6669429,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}/>
            </MapView>
          </View>
          <Text style={styles.content}>
            Hi {email}/{name}
          </Text>
          <TouchableOpacity style={{ padding: 20, width: 85 }} onPress={() => firebase.auth().signOut()} >
            <Text style={{ color: '#1B9CFC' }}>
              Logout
        </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 85 }} onPress={this.stop_observing}>
          <Text style={{ color: '#1B9CFC' }}>Durdur</Text>
        </TouchableOpacity>
        </View>
      </View>
    )
  }
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  articleContainer: {
    padding: 10,
    borderBottomColor: 'rgba(255,255,255,.7)',
    borderBottomWidth: 5
  },
  content: {
    marginTop: 10,
    fontSize: 19
  },
  searchbar: {
    padding:10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 10,
    fontSize: 16,
  },
  mapcontainer: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,

  },
  map: {
    flex:1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default Articles;

