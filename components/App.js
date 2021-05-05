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
        
        return <Articles />
      }

      case "register":{

        return <Register setPage={this.setPage}/>
      }
      
      case "getitem":{
        return <GetItem setPage={this.setPage}/>
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




































/*My design
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Router from './src/Router';
export default class App extends React.Component{
  render(){
    return(
     <Router/>
    )
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  },
});


/*import React from 'react';
import {NavigationContainer} from  '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';

const AppStack = createStackNavigator();

const App =() =>{
  return(
    <NavigationContainer>
      <AppStack.Navigator
      headerMode ="none"
      >
        <AppStack.Screen name="Onboarding" component={OnboardingScreen}/>
        <AppStack.Screen name="Login" component={LoginScreen}/>
        </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/

/*
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*
import React from 'react';
import {
 SafeAreaView,
 StyleSheet,
 ScrollView,
 View,
 Text,
 StatusBar,
} from 'react-native';

import {
 Header,
 LearnMoreLinks,
 Colors,
 DebugInstructions,
 ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
#defaultmainmenu
const App: () => React$Node = () => {
 return (
   <>
     <StatusBar barStyle="dark-content" />
     <SafeAreaView>
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={styles.scrollView}>
         <Header />
         {global.HermesInternal == null ? null : (
           <View style={styles.engine}>
             <Text style={styles.footer}>Engine: Hermes</Text>
           </View>
         )}
         <View style={styles.body}>
           <View style={styles.sectionContainer}>
             <Text style={styles.sectionTitle}>Step One</Text>
             <Text style={styles.sectionDescription}>
               Edit <Text style={styles.highlight}>App.js</Text> to change this
               screen and then come back to see your edits.
             </Text>
           </View>
           <View style={styles.sectionContainer}>
             <Text style={styles.sectionTitle}>See Your Changes</Text>
             <Text style={styles.sectionDescription}>
               <ReloadInstructions />
             </Text>
           </View>
           <View style={styles.sectionContainer}>
             <Text style={styles.sectionTitle}>Debug</Text>
             <Text style={styles.sectionDescription}>
               <DebugInstructions />
             </Text>
           </View>
           <View style={styles.sectionContainer}>
             <Text style={styles.sectionTitle}>Learn More</Text>
             <Text style={styles.sectionDescription}>
               Read the docs to discover what to do next:
             </Text>
           </View>
           <LearnMoreLinks />
         </View>
       </ScrollView>
     </SafeAreaView>
   </>
 );
};

const styles = StyleSheet.create({
 scrollView: {
   backgroundColor: Colors.lighter,
 },
 engine: {
   position: 'absolute',
   right: 0,
 },
 body: {
   backgroundColor: Colors.white,
 },
 sectionContainer: {
   marginTop: 32,
   paddingHorizontal: 24,
 },
 sectionTitle: {
   fontSize: 24,
   fontWeight: '600',
   color: Colors.black,
 },
 sectionDescription: {
   marginTop: 8,
   fontSize: 18,
   fontWeight: '400',
   color: Colors.dark,
 },
 highlight: {
   fontWeight: '700',
 },
 footer: {
   color: Colors.dark,
   fontSize: 12,
   fontWeight: '600',
   padding: 4,
   paddingRight: 12,
   textAlign: 'right',
 },
});

export default App;
*/