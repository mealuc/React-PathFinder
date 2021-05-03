import React, { Component } from 'react';
import { Platform } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, FlatList } from 'react-native';
import Articles from '../components/Articles';
import Dialog from "react-native-dialog";

export default class AddLocation extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            name: "",
            latitude: '',
            longitude: '',
            description: "",
            title: "",
            visible: false
        }
    }
    find_myposition = () => {
        Geolocation.getCurrentPosition(
          (position) => {
            let { coords: { latitude, longitude } } = position;
            this.setState({ latitude, longitude });
            console.log(position)
          },
          (error) => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 30000 }
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
        })
      }
      save_coords = () => {
        var database = firebase.database().ref('coords/');
        database.push({
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          owner_email: this.state.email,
          owner_name: this.state.name,
          description: this.state.description,
          title: this.state.title,
          userid: firebase.auth().currentUser.uid
        }).then(this.closeDialog)
          .catch((error) => console.log(error));
      }
    
    render() {
        return (
            <Modal ref={"myModal"} style={styles.container} position='center' backdrop={true}>
                <Text>Text Yazısı</Text>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        borderRadius: Platform.OS === 'ios' ? 30 : 0,
        shadowRadius: 10,
        width: screen.width - 80,
        height: 280,
    }

});