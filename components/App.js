import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Login from './Login';
import Articles from './Articles';
import firebase from 'firebase';
import Loading from './Loading';
import Register from './Register';
import GetItem from './GetItem';
class App extends Component {

  constructor(props){
    super(props);
    this.setPage = this.setPage.bind(this);
  }
  state={
    page:"login"
  }
  setPage(newpage) {
    this.setState({page: newpage});
  }
  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyB4yGXuHZdohxyUeUH5QbePe-EPFioDkRs",
      authDomain: "pathfinder1-b1db0.firebaseapp.com",
      databaseURL: "https://pathfinder1-b1db0-default-rtdb.firebaseio.com",
      projectId: "pathfinder1-b1db0",
      storageBucket: "pathfinder1-b1db0.appspot.com",
      messagingSenderId: "847647358257",
      appId: "1:847647358257:web:d8665868779246d518c410",
      measurementId: "G-0GNKBG0HNF"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          page: "articles"
        })
      } else {
        this.setState({
          page: "login"
        })
      }
    })
  }

  renderContent = () => {
    switch (this.state.page) {
      case "login":{

        return <Login setPage={this.setPage}/>
      }

      case "articles":{
        
        return <Articles  setPage={this.setPage}/>
      }

      case "register":{

        return <Register setPage={this.setPage}/>
      }

      case "getitem":{
        return <GetItem />
      }
      default:
        return <Loading />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;

