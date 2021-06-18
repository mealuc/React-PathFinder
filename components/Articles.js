import React, { Component, } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from 'react-native';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import Dialog from "react-native-dialog";
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      description: "",
      title: "",
      visible: false,
      price: "",
    }
  }

  componentDidMount = async () => {
    if (Platform.OS == 'android') {
      const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        'title': 'MapLocation',
        'message': 'Give Permission!'
      });
    }
    else {
      Geolocation.requestAuthorization();
    }
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

    Geolocation.getCurrentPosition(
      (position) => {
        let { coords: { latitude, longitude } } = position;
        this.props.setLastItem({ latitude, longitude });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true }
    );
  }
  stop_observing = () => {
    Geolocation.stopObserving();
  };
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
      price:this.state.price,
      userid: firebase.auth().currentUser.uid
    }).then(this.closeDialog)
      .catch((error) => console.log(error));
  }

  render() {
    const { email, name } = this.state;
    const { latitude, longitude } = this.props.LastItem;
    return (
      <View style={styles.container}>
        <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Konumuna Açıklama Ekle</Dialog.Title>
          <Dialog.Input placeholder="Başlık" onChangeText={title => this.setState({ title })}></Dialog.Input>
          <Dialog.Input placeholder="Açıklama" onChangeText={description => this.setState({ description })}></Dialog.Input>
          <Dialog.Input placeholder="Fiyat" onChangeText={price => this.setState({ price })}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Ekle" onPress={this.save_coords} />
        </Dialog.Container>
        <View style={styles.mapcontainer}>
            <MapView
              showsMyLocationButton={true}
              provider={PROVIDER_GOOGLE}///////// remove if not using Google Maps
              style={styles.map}
              region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}
              followsUserLocation={true}
              showsUserLocation={true}
            > 
            
            </MapView>
          </View>
        <Text>
          latitude:{latitude}
        </Text>
        <Text>
          longitude:{longitude}
        </Text>
        <View style={styles.articleContainer}>         
          <Text style={styles.content}>
            Hi {name}
          </Text>        
        </View>         
        <View style={styles.BottomTab}>
        <TouchableOpacity style={styles.BottomTabButton} onPress={this.showDialog}>
            <Text style={{ color: '#1B9CFC' }}>Add Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => firebase.auth().signOut()} >
            <Text style={{ color: '#1B9CFC' }}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => this.props.setPage("gotosearch")}>
            <Text style={{ color: '#1B9CFC' }}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => this.props.setPage("givedirection")}>
            <Text style={{ color: '#1B9CFC' }}>Route</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => this.props.setPage("navigation")}>
            <Text style={{ color: '#1B9CFC' }}>Navigation</Text>
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
    backgroundColor: 'gray',
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
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  BottomTab: {
    width: "100%",
    justifyContent: 'space-around',
    padding:20,
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
});

export default Articles;

/*

*/
/*
getItems = () => {
    firebase.database().ref('/coordinates')
      .orderByChild('description')
      .once('value', snapshot => {
        snapshot.forEach((child) => {
          console.log(child.val());
        })
      });
  }
*/
/*
<Marker
                draggable={true}
                onDragEnd={(e) =>
                  this.setState({ latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude })}
                title={"Here"}
                description={"MyHome"}
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }} />
                */