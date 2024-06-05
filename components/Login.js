import React, { useContext, useState } from 'react';
import {StyleSheet, Text, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import { SvgUri } from 'react-native-svg'; // Importing SvgUri
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const authContext = useContext(AuthContext);
       const { publicAxios } = useContext(AxiosContext);



    const onLogin = async () => {
        console.log('Attempting to log in:', { email, password }); // Log credentials being used (remove password logging in production)
        try {
            const response = await publicAxios.post('auth/authenticate', {
                email,
                password,
            });

            const { access_token: accessToken, refresh_token: refreshToken } = response.data;
            console.log('Login successful:', accessToken); // Log the successful response data
            console.log('Login successful:', refreshToken); // Log the successful response data

            authContext.setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
            });

            await SecureStore.setItemAsync('jwt', JSON.stringify({ accessToken, refreshToken }));
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
        }

    };


    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {/* Using SvgUri to display the SVG image */}
                <SvgUri
                    width="100" // Adjust the width as needed
                    height="100" // Adjust the height as needed
                    uri="https://upload.wikimedia.org/wikipedia/commons/1/17/SONEDE.svg"
                />
            </View>
            <Text style={styles.welcomeBack}>Welcome Back</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
           <TouchableOpacity style={styles.button} onPress={onLogin}>
                           <Text style={styles.buttonText}>Sign In</Text>
                       </TouchableOpacity>
    <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation?.navigate('SignUp')}
    >
        <Text style={styles.signupLink}>Don't have an account? Sign Up here</Text>
    </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    logoContainer: {
        marginBottom: 20,
    },
    welcomeBack: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    input: {
        width: '100%',
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
    },
    button: {
        width: '100%',
        height: 40,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupText: {
        marginTop: 10,
    },
    signupLink: {
        color: '#6200ee',
        fontWeight: 'bold',
    }
});
