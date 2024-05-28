// StaticAnomalie.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StaticAnomalie = () => {
  const anomalies = [
    { period: '2024-05-27', index: 1, id: 'A001' },
    { period: '2024-05-26', index: 2, id: 'A002' },
    { period: '2024-05-25', index: 3, id: 'A003' },
  ];

  return (
    <View style={styles.container}>
      {anomalies.map((anomaly, idx) => (
        <View key={idx} style={styles.anomalyContainer}>
          <Text style={styles.period}>Period: {anomaly.period}</Text>
          <Text style={styles.index}>Index: {anomaly.index}</Text>
          <Text style={styles.id}>ID: {anomaly.id}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  anomalyContainer: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  period: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  index: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5,
  },
  id: {
    fontSize: 14,
    color: '#999',
  },
});

export default StaticAnomalie;
