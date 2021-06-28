import React, { Component, } from 'react';
import { View, StyleSheet, TouchableOpacity, PermissionsAndroid, Image } from 'react-native';
import * as firebase from 'firebase';
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

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


  render() {
    const { email, name } = this.state;
    const { latitude, longitude } = this.props.LastItem;
    return (
      <View style={styles.container}>
 
        <View style={styles.mapcontainer}>
          <MapView
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
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
        <View style={styles.BottomTab}>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => this.props.setPage("gotosearch")}>
            <Image style={styles.buttonImage} source={require('../images/search.webp')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => this.props.setPage("givedirection")}>
            <Image style={styles.buttonImage} source={require('../images/route.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.BottomTabButton} onPress={() => firebase.auth().signOut()} >
            <Image style={styles.buttonImage} source={require('../images/logout1.png')} />
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
    padding: 10,
    height: 50,
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
});

export default Articles;

/*
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
*/
/*  save_coords = () => {
    var database = firebase.database().ref('coordinates/');
    database.push({
      title: this.state.title,
      description: this.state.description,
      owner_email: this.state.email,
      owner_name: this.state.name,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      price: this.state.price,
      userid: firebase.auth().currentUser.uid
    }).then(this.closeDialog)
      .catch((error) => console.log(error));
  } */
/*       <Dialog.Container visible={this.state.visible}>
          <Dialog.Title>Konumuna Açıklama Ekle</Dialog.Title>
          <Dialog.Input placeholder="Başlık" onChangeText={title => this.setState({ title })}></Dialog.Input>
          <Dialog.Input placeholder="Açıklama" onChangeText={description => this.setState({ description })}></Dialog.Input>
          <Dialog.Input placeholder="Fiyat" onChangeText={price => this.setState({ price })}></Dialog.Input>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Ekle" onPress={this.save_coords} />
        </Dialog.Container> */
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