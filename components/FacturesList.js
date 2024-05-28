// FactureList.js
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import FactureItem from './FactureItem';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FactureList = () => {
  const navigation = useNavigation();
  const factures = [
    { orderNumber: '001', date: '2024-05-27', amount: '150', status: 'payé' },
    { orderNumber: '002', date: '2024-05-26', amount: '200', status: 'non payé' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={factures}
        renderItem={({ item }) => (
          <FactureItem
            orderNumber={item.orderNumber}
            date={item.date}
            amount={item.amount}
            status={item.status}
          />
        )}
        keyExtractor={(item) => item.orderNumber}
      />
      <TouchableOpacity
        style={styles.plusButton}
        onPress={() => navigation.navigate('Formulaire')}
      >
        <Ionicons name="add-circle" size={56} color="#6200ee" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    padding: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default FactureList;
