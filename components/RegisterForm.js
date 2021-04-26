import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import database from "@react-native-firebase/database";
import firebase from "firebase";
class RegisterForm extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        error: null
    };
    _handleSubmit = ()=>{
        const email = this.state.email;
        const FullName = this.state.name;
        
        var database = firebase.database().ref('users/' + firebase.auth().currentUser.uid);
        database.set({
            name:FullName,            
            email:email,
        }).then((result)=> console.log(result))
        .catch((error)=>console.log(error));
    }
    handleSignUp = () => {
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials =>{       
            this._handleSubmit();
            return user;
        })
            .catch(err => {
                this.setState({
                    error: err.message
                })
            })
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    {this.state.error}
                </Text>
                <TextInput
                    placeholder="Full Name"
                    style={styles.input}
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>{this.handleSignUp();}}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf:"center",marginTop:2}} >
                    <Text style={{color:"#414959",fontSize:13}}>
                    Already Signed Up? <Text style={{fontWeight:"500",color:"#E9446A"}} onPress={()=>this.props.setPage("login")}>Login</Text>
                    </Text>            
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        width: 300,
        alignSelf: 'center'
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
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20
    },
    buttonContainer: {
        backgroundColor: '#3B3B98',
        padding: 9,
        borderRadius: 10,
        marginBottom: 15,
        width: 200,
        alignSelf: 'center'
    },
    errorText: {
        fontSize: 15,
        color: 'red',
        alignSelf: 'center',
        marginBottom: 10
    }
});

export default RegisterForm;