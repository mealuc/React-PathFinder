import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Logo from './Logo';
import RegisterForm from './RegisterForm';
const Register=(props)=>{
  return(
    <View style={styles.container}>
      <View style={styles.registerform}>
          <RegisterForm setPage={props.setPage}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  logoContainer:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
  },
  registerform:{
    flex:2,
    width:300
}
});

export default Register;