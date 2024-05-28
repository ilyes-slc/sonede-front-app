import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SignUpScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation(); // Initialize navigation object

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <SvgUri
                    width="100"
                    height="100"
                    uri="https://upload.wikimedia.org/wikipedia/commons/1/17/SONEDE.svg"
                />
            </View>
            <Text style={styles.welcomeBack}>Sign Up</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
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
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <Text style={styles.loginText}>
                Already have an account?
                <Text
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')} // Navigate to LoginScreen
                >
                    Log in
                </Text>
            </Text>
        </View>
    );
};

export default SignUpScreen;


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
    loginText: {
        marginTop: 20,
    },
    loginLink: {
        color: '#6200ee',
        fontWeight: 'bold',
    }
});
