// StaticFactureList.js
import React from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FactureItem = ({ orderNumber, date, amount, status }) => {
  return (
    <View style={styles.factureContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.orderNumber}>
          Order #: <Text style={styles.orderLink}>{orderNumber}</Text>
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.amount}>{amount} DT</Text>
      <TouchableOpacity
        style={[
          styles.statusButton,
          status === 'payé' ? styles.paye : styles.nonPaye,
        ]}
      >
        <Text style={styles.statusText}>{status}</Text>
      </TouchableOpacity>
    </View>
  );
};

const StaticFactureList = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FactureItem orderNumber="001" date="2024-05-27" amount="150" status="payé" />
      <FactureItem orderNumber="002" date="2024-05-26" amount="200" status="non payé" />
      <FactureItem orderNumber="003" date="2024-05-25" amount="250" status="payé" />
      <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate('Formulaire')}>
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
  factureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    color: '#000',
  },
  orderLink: {
    color: '#6200ee',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  paye: {
    backgroundColor: '#E0E0E0',
  },
  nonPaye: {
    backgroundColor: '#F5A623',
  },
  statusText: {
    color: '#6200ee',
  },
  plusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default StaticFactureList;
