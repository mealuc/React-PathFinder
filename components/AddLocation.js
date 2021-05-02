import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid,FlatList } from 'react-native';
import Modal from 'react-native-modalbox';
import Articles from '../components/Articles';

var screen = Dimensions.get('window');
export default class AddLocation extends Component{
    constructor(props){
        super(props);
    }

    showAddLocation=()=>{
        this.ref.myModal.open();
    }

    render() {
        return(
            <Modal ref={"myModal"} style={styles.container} position='center' backdrop={true}>
                <Text>Text Yazısı</Text>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        borderRadius: Platform.OS === 'ios' ? 30 : 0,
        shadowRadius:10,
        width:screen.width - 80,
        height:280,
    }

});