// screens/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [userPlaylists, setUserPlaylists] = useState([
    { id: 1, name: 'My Favorites' },
    { id: 2, name: 'Chill Vibes' },
    // Add more dummy playlists as needed
  ]);

  const pickImage = async () => {
    // Ask for permission
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission Denied', 'Permission to access camera roll is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };

  const editPlaylist = (playlistId) => {
    // Logic to edit playlist
    Alert.alert('Edit Playlist', `Edit playlist with ID: ${playlistId}`);
  };

  const deletePlaylist = (playlistId) => {
    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete this playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUserPlaylists(userPlaylists.filter((p) => p.id !== playlistId));
          },
        },
      ]
    );
  };

  const saveProfile = () => {
    // Save profile logic
    Alert.alert('Profile Saved', 'Your profile has been updated.');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            profilePicture
              ? { uri: profilePicture }
              : require('../assets/default-avatar.jpg')
          }
          style={styles.profilePicture}
        />
      </TouchableOpacity>

      {/* Profile Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
      </View>

      {/* Playlists Management */}
      <Text style={styles.playlistsTitle}>Your Playlists:</Text>
      <FlatList
        data={userPlaylists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.playlistItem}>
            <Text style={styles.playlistName}>{item.name}</Text>
            <View style={styles.playlistButtons}>
              <Button title="Edit" onPress={() => editPlaylist(item.id)} />
              <Button
                title="Delete"
                onPress={() => deletePlaylist(item.id)}
                color="red"
              />
            </View>
          </View>
        )}
      />

      {/* Save Button */}
      <Button title="Save Changes" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profilePicture: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#ccc',
  },
  infoContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  playlistsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  playlistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  playlistName: {
    fontSize: 16,
  },
  playlistButtons: {
    flexDirection: 'row',
  },
});
