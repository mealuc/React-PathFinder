import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, AnimatedRegion } from 'react-native-maps';
import Dialog from "react-native-dialog";
class Articles extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      name: "",
      search: "",
      latitude: '',
      longitude: '',
      description: "",
      title: "",
      visible: false,
    }
  }

  componentDidMount = async () => {
    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      'title': 'Deneme',
      'message': 'Konumu Ver!'
    });
    const useruid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + useruid).once('value')
      .then(snapshot => {
        const data = snapshot.val();
        this.setState({ name: data.name, email: data.email });
      });
    Geolocation.watchPosition(
      position => {
        const { coords: { latitude, longitude } } = position;
        this.setState({ latitude, longitude })
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true }
    );
  }
  componentWillUnmount = () =>{
    stop_observing = () => {
      Geolocation.stopObserving();
    };
  }
  getItems = () => {
    firebase.database().ref('/coordinates')
      .orderByChild('description')
      .once('value', snapshot => {
        snapshot.forEach((child) => {
          console.log(child.val());
        })
      });
  }
  find_myposition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let { coords: { latitude, longitude } } = position;
        this.setState({ latitude, longitude });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true }
    );
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  };
  showDialog = () => {
    this.setState({
      visible: true
    })
  }
  closeDialog = () => {
    this.setState({
      visible: false
    }, () => {
      alert('Konumu Eklendi!');
    });
  }
  save_coords = () => {
    var database = firebase.database().ref('coordinates/');
    database.push({
      title: this.state.title,
      description: this.state.description,
      owner_email: this.state.email,
      owner_name: this.state.name,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      userid: firebase.auth().currentUser.uid
    }).then(this.closeDialog)
      .catch((error) => console.log(error));
  }


  render() {
    const { search, latitude, longitude, email, name } = this.state;
    return (
      <View style={styles.container}>
        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Konumuna Açıklama Ekle</Dialog.Title>
          <Dialog.Input placeholder="Başlık" onChangeText={title => this.setState({ title })}></Dialog.Input>
          <Dialog.Input placeholder="Açıklama" onChangeText={description => this.setState({ description })}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Ekle" onPress={this.save_coords} />
        </Dialog.Container>
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
              provider={PROVIDER_GOOGLE}///////// remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude),
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              followsUserLocation={true}
              showsUserLocation={true}
            >
              <Marker
                draggable={true}
                onDragEnd={(e) =>
                  this.setState({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
                title={"Here"}
                description={"MyHome"}
                coordinate={{
                  latitude: Number(this.state.latitude),
                  longitude: Number(this.state.longitude),
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }} />
            </MapView>
          </View>
          <Text style={styles.content}>
            Hi {email}/{name}
          </Text>
          <TouchableOpacity style={{ padding: 20, width: 150 }} onPress={this.getItems}>
            <Text style={{ color: '#1B9CFC' }}>Snapshot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 150 }} onPress={() => this.props.setPage("CollapsibleFlatList")}>
            <Text style={{ color: '#1B9CFC' }}>FlatList</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 150 }} onPress={() => this.props.setPage("getitem")}>
            <Text style={{ color: '#1B9CFC' }}>GetItem</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 150 }} onPress={() => this.props.setPage("gotosearch")}>
            <Text style={{ color: '#1B9CFC' }}>GotoSearch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 150 }} onPress={() => this.props.setPage("givedirection")}>
            <Text style={{ color: '#1B9CFC' }}>YolTarifi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 150 }} onPress={this.showDialog}>
            <Text style={{ color: '#1B9CFC' }}>Konumu Kaydet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 150 }} onPress={this.find_myposition}>
            <Text style={{ color: '#1B9CFC' }}>Konumumu Bul</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 20, width: 85 }} onPress={() => firebase.auth().signOut()} >
            <Text style={{ color: '#1B9CFC' }}>
              Logout
            </Text>
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
  mapcontainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,

  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

export default Articles;

//Number(41.2351403),
//Number(32.6669429),
/*<Marker
draggable={true}
onDragEnd={(e) =>
  this.setState({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
title={"Here"}
description={"MyHome"}
coordinate={{
  latitude: Number(this.state.latitude),
  longitude: Number(this.state.longitude),
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
}} />
///////////////////
getItems = () => {
    firebase.database().ref('/coordinates')
      .once('value', snapshot => {
        console.log(snapshot.val());
      });
  }
*/