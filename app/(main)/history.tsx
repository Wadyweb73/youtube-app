import Header from '@/components/header';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

type History = Doc<"history">;

const History = () => {
  const history = useQuery(api.history.getLinks);

  const historyButtonClickHandler = (url: string) => {
    const confirmed = confirm("Tem certeza que deseja abrir este link?");

    if (confirmed) {
      AsyncStorage.setItem('link', url);
      router.replace('/home');
    }
  }

  const renderLinkHistoryItem = (item: History) => {
    return (
      <View style={styles.historyItemContainer}>
        <TouchableOpacity onPress={() => historyButtonClickHandler(item.url)}>
          <Text style={styles.historyItemText}>{item.url}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <Header />

      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Historico</Text>
      </View>

      <View style={styles.historyContainer}>
        <FlatList 
          data={history}
          renderItem={({ item }) => renderLinkHistoryItem(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screenTitleContainer: {
    padding: 10,
    borderBottomWidth: 1
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  historyContainer: {
    margin: 5,
    borderWidth: 1,
    borderColor: '#cdcdcd'
  },
  historyItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd'
  },
  historyItemText: {
    fontSize: 15,
    color: '#ff0000'
  }
})

export default History;
