// components/PlaylistItem.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PlaylistItem = ({ playlist, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(playlist)}
      style={styles.itemContainer}
    >
      <Text style={styles.itemName}>{playlist.name}</Text>
      <Text style={styles.itemTracks}>{playlist.tracks.length} tracks</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    marginVertical: 6,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTracks: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaylistItem;
