// screens/SearchPlaylistsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import { Audio } from 'expo-av';
import DateTimePicker from '@react-native-community/datetimepicker';
import PlaylistItem from '../components/PlaylistItem';
import { Avatar } from 'react-native-elements';

export default function SearchPlaylistsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [viewers, setViewers] = useState([]);
  const [sound, setSound] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // Updated placeholder data with realistic names
  useEffect(() => {
    const dummyPlaylists = [
        {
          id: 1,
          name: 'Top Hits 2023',
          date: '2023-10-01',
          tracks: [
            { id: 't1', uri: '', title: 'Blinding Lights', artist: 'The Weeknd' },
            { id: 't2', uri: '', title: 'Levitating', artist: 'Dua Lipa' },
            { id: 't3', uri: '', title: 'Peaches', artist: 'Justin Bieber' },
            // Add more tracks
          ],
          viewers: [
            { id: 1, username: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?img=1' },
            { id: 2, username: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?img=2' },
            { id: 3, username: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?img=3' },
          ],
        },
        {
          id: 2,
          name: 'Chill Vibes',
          date: '2023-10-05',
          tracks: [
            { id: 't4', uri: '', title: 'Night Breeze', artist: 'Lo-Fi Beats' },
            { id: 't5', uri: '', title: 'Soft Glow', artist: 'Chillhop Music' },
            { id: 't6', uri: '', title: 'Peaceful Mind', artist: 'RelaxTime' },
            // Add more tracks
          ],
          viewers: [
            { id: 4, username: 'Dana', avatarUrl: 'https://i.pravatar.cc/150?img=4' },
            { id: 5, username: 'Evan', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
            { id: 6, username: 'Fiona', avatarUrl: 'https://i.pravatar.cc/150?img=6' },
          ],
        },
        {
          id: 3,
          name: 'Workout Mix',
          date: '2023-10-10',
          tracks: [
            { id: 't7', uri: '', title: 'Stronger', artist: 'Kelly Clarkson' },
            { id: 't8', uri: '', title: 'Eye of the Tiger', artist: 'Survivor' },
            { id: 't9', uri: '', title: 'Don\'t Stop Me Now', artist: 'Queen' },
            // Add more tracks
          ],
          viewers: [
            { id: 7, username: 'George', avatarUrl: 'https://i.pravatar.cc/150?img=7' },
            { id: 8, username: 'Hannah', avatarUrl: 'https://i.pravatar.cc/150?img=8' },
            { id: 9, username: 'Ian', avatarUrl: 'https://i.pravatar.cc/150?img=9' },
          ],
        },
        // Add more playlists as needed
      ];
      
   
    setPlaylists(dummyPlaylists);
  }, []);

  useEffect(() => {
    filterPlaylists();
  }, [searchQuery, selectedDate, playlists]);

  const filterPlaylists = () => {
    const filtered = playlists.filter((playlist) => {
      const matchesQuery = playlist.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    //   const matchesDate =
    //     new Date(playlist.date).toDateString() === selectedDate.toDateString();
    //   return matchesQuery && matchesDate;
    return matchesQuery
    });
    setFilteredPlaylists(filtered);
  };

  const selectPlaylist = (playlist) => {
    // Navigate to PlaylistDetailsScreen
    navigation.navigate('PlaylistDetails', { playlist });
  };

  // Rest of the code remains the same...

  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const onDateChange = (event, date) => {
    setIsDatePickerVisible(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search playlists by name..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        style={styles.searchBar}
      />

      {/* Date Picker */}
      <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>{selectedDate.toDateString()}</Text>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {/* Playlist List */}
      <FlatList
        data={filteredPlaylists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlaylistItem playlist={item} onPress={selectPlaylist} />
        )}
        style={styles.playlistList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  datePickerButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  datePickerText: {
    fontSize: 16,
  },
  playlistList: {
    marginTop: 16,
  },
});
