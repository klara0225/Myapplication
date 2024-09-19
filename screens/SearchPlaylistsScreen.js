// screens/SearchPlaylistsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import { Audio } from 'expo-av';
import DateTimePicker from '@react-native-community/datetimepicker';
import PlaylistItem from '../components/PlaylistItem';
import { Avatar } from 'react-native-elements';

export default function SearchPlaylistsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [viewers, setViewers] = useState([]);
  const [sound, setSound] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // Dummy data for demonstration
  useEffect(() => {
    const dummyPlaylists = [
      {
        id: 1,
        name: 'Top Hits',
        date: '2023-10-01',
        tracks: [
          { id: 't1', uri: 'https://example.com/song1.mp3', title: 'Song 1' },
          { id: 't2', uri: 'https://example.com/song2.mp3', title: 'Song 2' },
        ],
      },
      // Add more dummy playlists as needed
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
      const matchesDate =
        new Date(playlist.date).toDateString() === selectedDate.toDateString();
      return matchesQuery && matchesDate;
    });
    setFilteredPlaylists(filtered);
  };

  const selectPlaylist = async (playlist) => {
    setCurrentPlaylist(playlist);
    fetchViewers(playlist.id);

    // Load and play the first track
    if (playlist.tracks.length > 0) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: playlist.tracks[0].uri },
        { shouldPlay: true }
      );
      setSound(newSound);
    }
  };

  const playMusic = async () => {
    if (sound) {
      await sound.playAsync();
    }
  };

  const pauseMusic = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
  };

  const skipTrack = async () => {
    // Implement skip functionality as needed
    alert('Skip track functionality is not implemented.');
  };

  const fetchViewers = (playlistId) => {
    // Dummy viewers data
    const dummyViewers = [
      { id: 1, username: 'User1', avatarUrl: 'https://via.placeholder.com/150' },
      { id: 2, username: 'User2', avatarUrl: 'https://via.placeholder.com/150' },
    ];
    setViewers(dummyViewers);
  };

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
        <Text style={styles.datePickerText}>
          {selectedDate.toDateString()}
        </Text>
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

      {/* Music Player Controls */}
      {currentPlaylist && (
        <View style={styles.musicControls}>
          <Text style={styles.currentPlaylistText}>
            Now Playing: {currentPlaylist.name}
          </Text>
          <View style={styles.controlsContainer}>
            <Button title="Play" onPress={playMusic} />
            <Button title="Pause" onPress={pauseMusic} />
            <Button title="Skip" onPress={skipTrack} />
          </View>
        </View>
      )}

      {/* Viewers List */}
      {viewers.length > 0 && (
        <View style={styles.viewersContainer}>
          <Text style={styles.viewersTitle}>Listeners:</Text>
          <FlatList
            data={viewers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.viewerItem}>
                <Avatar
                  source={{ uri: item.avatarUrl }}
                  rounded
                  size="small"
                />
                <Text style={styles.viewerName}>{item.username}</Text>
              </View>
            )}
          />
        </View>
      )}
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
  musicControls: {
    marginTop: 16,
  },
  currentPlaylistText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  viewersContainer: {
    marginTop: 16,
  },
  viewersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  viewerName: {
    marginLeft: 8,
  },
});
