import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid, FlatList } from 'react-native';
import Dialog from "react-native-dialog";
import Geolocation from '@react-native-community/geolocation';

class AddLocation extends Component {
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
        var database = firebase.database().ref('coordinates/');
        database.push({
            owner_email: this.state.email,
            owner_name: this.state.name,
            title: this.state.title,
            description: this.state.description,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            userid: firebase.auth().currentUser.uid
        }).then(this.closeDialog)
            .catch((error) => console.log(error));
    }

    render() {
        return (
            <View>
                <Dialog.Container visible={this.state.visible}>
                    <Dialog.Title>Konumuna Açıklama Ekle</Dialog.Title>
                    <Dialog.Input placeholder="Başlık" onChangeText={title => this.setState({ title })}></Dialog.Input>
                    <Dialog.Input placeholder="Açıklama" onChangeText={description => this.setState({ description })}></Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    <Dialog.Button label="Ekle" onPress={this.save_coords} />
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    }

});

const Add_Location=new AddLocation();

export default Add_Location;