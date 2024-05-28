import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Formulaire = () => {
  const navigation = useNavigation();
  const [orderNumber, setOrderNumber] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [isPaid, setIsPaid] = useState(false);

  const handleConfirm = () => {
    const newFacture = {
      orderNumber,
      date,
      amount,
      status: isPaid ? 'payé' : 'non payé',
    };
    // Pass the new facture data back to the StaticFactureList screen
    navigation.navigate('StaticFactureList', { newFacture });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://www.e-affacturage.fr/images/cession-de-facture.jpg' }}
        style={styles.image}
      />
      <Text style={styles.title}>Add New Facture</Text>
      <TextInput
        style={styles.input}
        placeholder="Order Number"
        value={orderNumber}
        onChangeText={setOrderNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
      />
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.button, isPaid && styles.selected]}
          onPress={() => setIsPaid(true)}
        >
          <Text style={isPaid ? styles.selectedText : styles.unselectedText}>Paid</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isPaid && styles.selected]}
          onPress={() => setIsPaid(false)}
        >
          <Text style={!isPaid ? styles.selectedText : styles.unselectedText}>Unpaid</Text>
        </TouchableOpacity>
      </View>
      <Button
        title="Confirm"
        onPress={handleConfirm}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ccc', // Default background color
  },
  selected: {
    backgroundColor: '#33A5FF', // Green background for selected
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  unselectedText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Formulaire;
