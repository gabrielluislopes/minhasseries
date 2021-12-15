import React from 'react';
import {
  View, 
  TextInput, 
  StyleSheet, 
  Button, 
  ActivityIndicator,
  Text,
  Alert
} from 'react-native';
import FormRow from '../components/FormRow';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

import { connect } from 'react-redux';

import { processLogin, setLoadingDb } from '../actions';


class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            email: "",
            password: "",
            isLoading: false,
            message: "",
        }
    }

    componentDidMount(){
        const firebaseConfig = {
            apiKey: "AIzaSyAjQGC12Yq0V5Hlt3MsUOw0YmylCBlldto",
            authDomain: "minhasseries-42e1e.firebaseapp.com",
            projectId: "minhasseries-42e1e",
            storageBucket: "minhasseries-42e1e.appspot.com",
            messagingSenderId: "79924348925",
            appId: "1:79924348925:web:13b1cfef00e326cace7b94",
            measurementId: "G-5SHZFX9E1S",
            databaseURL: "https://minhasseries-42e1e.firebaseapp.com"
        };

        /* const firebaseConfig = {
            apiKey: "AIzaSyDj9ZQROJ0mln8W4zHm6oDss4SrNTzpS3M",
            authDomain: "series-50dbf.firebaseapp.com",
            projectId: "series-50dbf",
            storageBucket: "series-50dbf.appspot.com",
            messagingSenderId: "185308279321",
            appId: "1:185308279321:web:89895f80967318f0e03088",
            measurementId: "${config.measurementId}",
            databaseURL: "https://series-50dbf.firebaseapp.com"
          }; */
          

        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig);
        }else{
            firebase.app();
        }

    }

    onChangeHandler(field, valor) {
        this.setState({
            [field]: valor
        })
    }

    processLogin() {
        this.setState({ isLoading: true });
        const {email, password} = this.state;

        this.props.processLogin({email, password})
            .then( user => {

                if(user){
                    this.props.navigation.replace('Main');
                }
                else{
                    this.setState( { 
                        isLoading: false,
                        message: "",
                    })
                }
            })
            .catch( error => {
                this.setState( {  
                    isLoading: false,
                    message: this.getMessageByError(error.code), 
                });
            })
    }

    getMessageByError(code) {
        switch(code) {
            case "auth/user-not-found":
                return "E-mail inexistente.";
            case "auth/wrong-password":
                return "Senha incorreta."
            default:
                return "Erro desconhecido.";
        }
    }

    renderButton() {
        if(this.state.isLoading)
            return <ActivityIndicator />;
        return (
            <Button 
                title='Entrar'
                onPress={() => {
                    this.processLogin()
                }}
            />
        );
    }

    renderMessage() {
        const { message } = this.state;
    
        if(!message) 
            return null;
        
        return(
            <View>
                <Text>{message}</Text>
            </View>  
        );
    }

    render() {
        return(
            <View>
                <FormRow>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="E-mail: user@provider.com"
                        value={this.state.email}
                        onChangeText={valor => {
                        this.onChangeHandler('email', valor)
                        }}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />           
                </FormRow>
    
                <FormRow>
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Enter your password here"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={valor => {
                            this.onChangeHandler('password', valor)
                        }}
                        autoCapitalize="none"
                    />            
                </FormRow>
    
                 { this.renderButton() }
                { this.renderMessage() }
    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingLeft: 10,
        paddingRight: 10,
    }
  });

export default connect(null, {processLogin})(LoginScreen);
