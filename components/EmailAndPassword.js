import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
class EmailAndPassword extends Component {
    state={
        email:'',
        password:'',
        error:'',
        loading:false
    }

    onBottomPress = ()=>{
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then(this.onLoginSuccess)
        .catch(err =>{
            this.setState({
                error:err.message
            })
        })
    }
    onLoginSuccess = () =>{
        this.setState({
            error:'',
            loading:false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                placeholder="Email" 
                style={styles.input} 
                value={this.state.email}
                onChangeText={email=>this.setState({email})} 
                />
                <TextInput 
                placeholder="Password" 
                style={styles.input} 
                secureTextEntry
                value={this.state.password}
                onChangeText={password=>this.setState({password})}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this.onBottomPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:"center",marginTop:2}} >
                    <Text style={{color:"#414959",fontSize:13}}>
                    New to PathFinder? <Text style={{fontWeight:"500",color:"#E9446A"}} onPress={()=>this.props.setPage("register")}>Sign Up</Text>
                    </Text>            
                </TouchableOpacity>
                <Text style={styles.errorText}>
                        {this.state.error}
                </Text>
            </View>
        );
    }
}
//
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,.5)',
        paddingLeft: 15,
        marginBottom: 15,
        borderRadius: 5,
        fontSize: 15,
        borderWidth: 1,
        borderRadius: 10,      
    },
    errorText:{
        fontSize:20,
        color:'red',
        alignSelf:'center',
        marginTop:10
    },
    buttonText:{
        textAlign:'center',
        color:'#fff',
        fontWeight:'bold',
        fontSize:20
    },
    buttonContainer:{
        backgroundColor:'#3B3B98',
        padding:9,
        borderRadius:10,
        marginBottom: 15,
    }
});

export default EmailAndPassword;