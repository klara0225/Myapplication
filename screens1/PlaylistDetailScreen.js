// screens/PlaylistDetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import { Avatar } from 'react-native-elements';

export default function PlaylistDetailsScreen({ route }) {
  const { playlist } = route.params;

  return (
    <View style={styles.container}>
      {/* Playlist Info */}
      <Text style={styles.playlistName}>{playlist.name}</Text>
      <Text style={styles.playlistDate}>
        Date: {new Date(playlist.date).toDateString()}
      </Text>

      {/* Songs List */}
      <Text style={styles.sectionTitle}>Songs:</Text>
      <FlatList
        data={playlist.tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songArtist}>by {item.artist}</Text>
          </View>
        )}
      />

      {/* Viewers List */}
      <Text style={styles.sectionTitle}>Listeners:</Text>
      <FlatList
        data={playlist.viewers}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.viewerItem}>
            <Avatar
              source={{ uri: item.avatarUrl }}
              rounded
              size="medium"
              containerStyle={styles.avatar}
            />
            <Text style={styles.viewerName}>{item.username}</Text>
          </View>
        )}
        contentContainerStyle={styles.viewersList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  playlistName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  playlistDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  songItem: {
    marginBottom: 12,
  },
  songTitle: {
    fontSize: 16,
  },
  songArtist: {
    fontSize: 14,
    color: '#666',
  },
  viewerItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  viewerName: {
    marginTop: 8,
    fontSize: 14,
  },
  viewersList: {
    marginTop: 8,
  },
});
