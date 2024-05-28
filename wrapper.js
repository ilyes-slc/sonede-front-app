import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/Login';
import Spinner from './components/Spinner';
import { AuthContext } from './context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import SignUpScreen from './components/Signup';
import HomeTabs from './components/homeTabs'; // Ensure correct path and casing
import Formulaire from './components/formulaire'; // Ensure correct path and casing
import EditProfile from './components/EditProfile'; // Ensure correct path and casing
import ChangePassword from './components/ChangePassword'; // Ensure correct path and casing
import { ProfileProvider } from './context/ProfileContext'; // Import the ProfileProvider
import Profile from './components/profile'; // Ensure correct path and casing
import FactureItem from './components/FactureItem'; // Ensure correct path and casing

const Stack = createNativeStackNavigator();

const Wrapper = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState('loading');

  const loadJWT = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync('jwt'); // Retrieve JWT from SecureStore
      const jwt = value ? JSON.parse(value) : {};

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
  }, [authContext]);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {!authContext.authState.authenticated ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            </>
          ) : (
            <>
              <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
              <Stack.Screen name="Formulaire" component={Formulaire} options={{ title: 'Add Facture' }} />
              <Stack.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }} />
              <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password' }} />
                            <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
                            <Stack.Screen name="FactureItem" component={FactureItem} options={{ title: 'FactureItem' }} />

            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default Wrapper;
