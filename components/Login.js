import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import { AxiosContext } from '../context/AxiosContext';
import { useTailwind } from "tailwind-rn";
import { SvgUri } from 'react-native-svg';
import LocalImage from '../assets/SONEDE.svg'; // Make sure this path is correct and supports SVG


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const { publicAxios } = useContext(AxiosContext);
    const tailwind = useTailwind();


    const onLogin = async () => {
        try {
            const response = await publicAxios.post('/auth/authenticate', {
                email,
                password,
            });

            const { accessToken, refreshToken } = response.data;
            authContext.setAuthState({
                accessToken,
                refreshToken,
                authenticated: true,
            });

            await SecureStore.setItemAsync('jwt', JSON.stringify({ accessToken, refreshToken }));
        } catch (error) {
            let message = "Unexpected error occurred.";
            if (error.response && error.response.data && error.response.data.message) {
                message = error.response.data.message;
            }
            Alert.alert('Login Failed', message);
        }
    };
    <SvgUri
        width="100"
        height="100"
        uri={require('../assets/SONEDE.svg')} // Update the path if necessary
    />

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={tailwind('flex-1')}>
            <View style={tailwind('flex-1 justify-center items-center px-4 bg-white mt-9')}>
                <View style={tailwind('mb-4 items-center')}>
                    <Image
                        source={LocalImage}
                        style={tailwind('h-50 w-full')} // Ensure this style adjusts the image properly
                    />
                    <Text style={tailwind('text-xl font-bold ')}>SONEDE</Text>
                </View>
                <Text style={tailwind('text-lg mb-2')}>Welcome Back</Text>
                <TextInput
                    style={tailwind('border border-gray-300 p-2 rounded-lg mb-4')}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={tailwind('border border-gray-300 p-2 rounded-lg mb-6')}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <TouchableOpacity onPress={onLogin} style={tailwind('bg-blue-500 p-3 rounded-lg items-center mb-4')}>
                    <Text style={tailwind('text-white text-lg')}>Sign In</Text>
                </TouchableOpacity>
                <Text style={tailwind('text-sm text-center')}>
                    Don't have an account?
                    <Text onPress={() => {/* navigation.navigate('SignUp') */}} style={tailwind('text-blue-500 underline')}>
                        Sign Up here
                    </Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Login;
