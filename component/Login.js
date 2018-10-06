import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    ActivityIndicator   
} from 'react-native';

import { TextInput } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';

export default class Login extends Component{

    state = {
        username: '',
        passoword: '',
        isLoggingIn: false,
        message: ''
    }

    _userLogin = () => {

        this.setState({isLoggingIn:true, message:'' });

        var params = {
            username: this.state.username,
            passoword: this.state.passoword,
            grant_type: 'password'
        };

        var fromBody = [];
        for (var property in params){
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            fromBody.push(encodedKey + "=" + encodedValue);
        }
        
        fromBody = fromBody.join("&");

        var proceed = false;
        fetch("https://www.glostars.com/api/account/LoginToken", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: fromBody
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.error){
                this.setState({message: response.message});
            }
            else{
                proceed = true;
            }
        })
        .then(() => {
            this.setState({isLoggingIn: false})
            if(proceed){
                this.props.onLoginPress();
            }
        })
        .done();
    }




    render(){
        return(
            <ScrollView style = {{padding: 20}}>
                <Text style={{fontSize: 27}}>
                    Login
                </Text>
                <TextInput 
                    placeholder="Username" 
                    onChangeText={(username) => this.setState({username})}
                />
                <TextInput 
                    placeholder="Password"
                    onChangeText={(passoword) => this.setState({passoword})}
                />
                {/* error message section */}
                {!!this.state.message && (
                    <Text style={{ fontSize:14, color:'red', padding:5 }}>
                        {this.state.message}
                    </Text>
                )}


                {this.state.isLoggingIn && <ActivityIndicator />}
                <View style={{margin:7}}/>
                <Button 
                    disabled={this.state.isLoggingIn || !this.state.username || !this.state.passoword}
                    onPress={ this._userLogin } 
                    title="Submit"
                />
            </ScrollView>
        );
    }
}