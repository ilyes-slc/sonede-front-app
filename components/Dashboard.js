import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const handleProfilePress = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to navigate to the Profile screen?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => navigation.navigate('Profile')
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dashboard</Text>
        <TouchableOpacity onPress={handleProfilePress}>
          <Icon name="account-circle" size={30} color="#6200ee" />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dernier releve</Text>
        <TouchableOpacity>
          <Icon name="chevron-right" size={30} color="#6200ee" />
        </TouchableOpacity>
      </View>
      <View style={styles.dataRow}>
        <Text style={styles.dataValue}>15/26</Text>
        <Text style={styles.dataValue}>123465</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>factures non payees</Text>
        <View style={styles.invoice}>
          <Text style={styles.invoiceAmount}>230 DT</Text>
          <Text style={styles.invoiceDue}>Due: Today, 6:20pm</Text>
          <TouchableOpacity style={styles.detailsButton}         onPress={() => navigation.navigate('FactureItem')}
>
            <Icon name="info" size={20} color="#6200ee" />
            <Text style={styles.detailsText}>voir details</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.invoice}>
          <Text style={styles.invoiceAmount}>300 DT</Text>
          <Text style={styles.invoiceDue}>Due: Today, 6:20pm</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Icon name="info" size={20} color="#6200ee" />
            <Text style={styles.detailsText }   onPress={() => navigation.navigate('FactureItem')}>voir details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Activity</Text>
        <Text style={styles.cardSubtitle}>Below is an overview of tasks & activity completed.</Text>
        <LineChart
          data={{
            labels: ['1', '7', '14', '21', '28', '30'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={300} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dataValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  invoice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  invoiceDue: {
    fontSize: 14,
    color: '#777',
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsText: {
    color: '#6200ee',
    marginLeft: 5,
  },
});
