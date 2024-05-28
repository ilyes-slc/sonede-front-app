import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProfileContext } from '../context/ProfileContext'; // Import the ProfileContext

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { profile } = useContext(ProfileContext); // Access profile data from context



  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7c5Nj4a7oChd-rUn4OwOa53A_MmPJWjbi7fKCgyASFA&s' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profile.username}</Text>
        <Text style={styles.profileEmail}>{profile.email}</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('ChangePassword')}
        >
          <Text style={styles.menuText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notification Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Terms of Services</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton}
       onPress={() => navigation.navigate('Login')}

>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#5A67D8',
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: '#FFF',
    fontSize: 14,
  },
  menuContainer: {
    width: '100%',
    padding: 20,
  },
  menuItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#E53E3E',
  },
});

export default ProfileScreen;
