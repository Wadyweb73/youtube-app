import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyStatsArea = () => {
  return (
    <View style={styles.emptyStatsAreaContainer}>
      <Ionicons name='alert-circle-sharp' size={150} color={'red'} />
      <Text style={styles.emptyStatsAreaMessage}>Submeta o link de um video para ver as estatisticas.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStatsAreaContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 10,
    outlineWidth: 0,
    gap: 10
  },
  emptyStatsAreaMessage: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ff0000ff'
  }
})

export default EmptyStatsArea;
