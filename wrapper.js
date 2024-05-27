import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppRegistry } from 'react-native';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Spinner from "./components/Spinner";
import { AuthContext, AuthProvider } from './context/AuthContext';
import { AxiosProvider } from './context/AxiosContext';
import * as Keychain from 'react-native-keychain';

import { name as appName } from './app.json';
import * as SecureStore from "expo-secure-store"; // Import appName from app.json


const Wrapper = () => {
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState('loading');

    const loadJWT = useCallback(async () => {
        try {
            const value = await SecureStore.getItemAsync('jwt'); // Retrieve JWT from SecureStore
            const jwt = JSON.parse(value);

            authContext.setAuthState({
                accessToken: jwt.accessToken || null,
                refreshToken: jwt.refreshToken || null,
                authenticated: jwt.accessToken !== null,
            });
            setStatus('success');
        } catch (error) {
            setStatus('error');
            console.log(`SecureStore Error: ${error.message}`);
            authContext.setAuthState({
                accessToken: null,
                refreshToken: null,
                authenticated: false,
            });
        }
    }, []);

    useEffect(() => {
        console.log("AuthContext:", authContext); // Log the value of authContext
        console.log("AuthState:", authContext.authState); // Log the value of authState

        loadJWT().then(r => console.log("reload done"));
    }, [loadJWT]);

    if (status === 'loading') {
        return <Spinner />;
    }

    if (authContext?.authState?.authenticated === false) {
        return <Login />;
    } else {
        return <Dashboard />;
    }
};
export default Wrapper;