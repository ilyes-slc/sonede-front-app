import React, {useContext, useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {AxiosContext} from '../context/AxiosContext';
import Spinner from './Spinner';

const Dashboard = () => {
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('idle');

    const loadImage = async () => {
        setStatus('loading');
        try {
            const response = await axiosContext.authAxios.get('/cat');
            setImage(response.data);
            setStatus('success');
        } catch (error) {
            setStatus('error');
        }
    };

    if (status === 'loading') {
        return <Spinner />;
    }

    return (
        <View >


            <View >
                <Button title="Logout" onPress={() => authContext.logout()} />
            </View>
        </View>
    );
};

export default Dashboard;