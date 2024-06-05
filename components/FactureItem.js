import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AxiosContext } from '../context/AxiosContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const FactureItem = () => {
  const axiosContext = useContext(AxiosContext);
  const navigation = useNavigation(); // Get the navigation object
  const [facture, setFacture] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacture = async () => {
      try {
        const response = await axiosContext.authAxios.get(`factures`);
        setFacture(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error('Access denied. You might need to re-authenticate.');
        }
        console.error('Failed to fetch facture:', error);
        setLoading(false);
      }
    };

    fetchFacture();
  }, [axiosContext.authAxios]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!facture || facture.length === 0) {
    return <Text>No data found.</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.factureContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.orderNumber}>
            Order #: <Text style={styles.orderLink}>{facture[0].id}</Text>
          </Text>
          <Text style={styles.date}>{facture[0].period}</Text>
        </View>
        <Text style={styles.amount}>{facture[0].montant} DT</Text>
        <TouchableOpacity
          style={[
            styles.statusButton,
            facture[0].etat === 'payé' ? styles.paye : styles.nonPaye,
          ]}
        >
          <Text style={styles.statusText}>{facture[0].etat}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Formulaire')} // Adjust 'Formulaire' as needed
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  }
});

export default FactureItem;
