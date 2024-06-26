import React, {createContext, useState} from 'react';
import * as Keychain from 'react-native-keychain';
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        accessToken: null,
        refreshToken: null,
        authenticated: null,
    });

    const logout = async () => {
        await SecureStore.deleteItemAsync('accessToken');
        await SecureStore.deleteItemAsync('refreshToken');

        setAuthState({
            accessToken: null,
            refreshToken: null,
            authenticated: false,
        });
    };

    const getAccessToken = () => {
        console.log("token:"+authState.accessToken);
        return authState.accessToken;
    };

    return (
        <Provider
            value={{
                authState,
                getAccessToken,
                setAuthState,
                logout,
            }}>
            {children}
        </Provider>
    );
};

export {AuthContext, AuthProvider};