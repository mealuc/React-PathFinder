import React, {Component} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import Logo1 from '../images/logo1.png'
const Logo=()=>{
  return(
    <View style={styles.container}>
      <Image source={Logo1}style={{height:150,width:150}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    
  },
});

export default Logo;