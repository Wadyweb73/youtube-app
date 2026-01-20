import EmptyStatsArea from '@/components/emptyStatsArea';
import Header from '@/components/header';
import Thumb from '@/components/thumb';
import { api } from '@/convex/_generated/api';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from 'convex/react';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData]           = useState(null);

  const saveNewLink = useMutation(api.history.addLink);

  useEffect(() => {
    const fetchLinkFromStorage = async () => {
      const storedLink = await AsyncStorage.getItem('link');

      if (storedLink) {
        setInputText(storedLink);
        await onSubmitButtonClicked(storedLink);
        AsyncStorage.removeItem('link');
      }
    };

    fetchLinkFromStorage();
  }, []);

  const onSubmitButtonClicked = async (link?: string) => {
    const inputValue:string = link ?? inputText;

    if (inputValue.trim() === '') {
      alert('Impossível encontrar vídeo! Nenhum link foi inserido.');
      return;
    }

    // Extrai ID de vários formatos do YouTube
    const match = inputValue.match(
      /(?:v=|youtu\.be\/|embed\/|shorts\/)([0-9A-Za-z_-]{11})/
    );

    if (!match) {
      alert('Link do YouTube inválido.');
      setInputText("");
      return;
    }

    const videoId = match[1];
    const params  = {
      part: 'snippet,statistics',
      id: videoId,
      key: 'AIzaSyCcMdiXy4YjWy40ClBSmdp6MEbchRNMHz8',
    };

    const queryString = new URLSearchParams(params).toString();
    const url         ='https://www.googleapis.com/youtube/v3/videos?' + queryString;

    const response = await fetch(url);
    const data = await response.json();
    
    setData(data['items'][0] || null);
    console.log(data['items'][0]);

    saveNewLink({ url: inputText });
  };

  return (
    <SafeAreaView style={styles.safeareaContainer}>
      <Header/>

      <View style={{
        padding: 10,
        display: 'flex',
        gap: 10,
        flex: 1,
      }}>
        <View style={styles.urlInputContainer}>
          <TextInput 
            placeholder='Cole o link do video aquí'
            style={styles.urlInput}
            value={inputText}
            onChangeText={setInputText}
            placeholderTextColor={'#947e7eff'}
          />
          <TouchableOpacity style={styles.submitButton} onPress={ () => { onSubmitButtonClicked() } }>
            <Ionicons style={{
              color: 'white',
              fontSize: 30
            }} name='arrow-forward-sharp' />
          </TouchableOpacity>
        </View>

        {
          (data === null) ? (
            <EmptyStatsArea />
          ) : (
            <ScrollView style={styles.statsContainer} contentContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Thumb video={data} />
            </ScrollView>
          )
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f4f4f4',
    display: 'flex',
  },
  urlInputContainer: {
    display: 'flex',
    flexDirection: 'row', 
    gap: 10,
    borderWidth: 0,
    overflow: 'hidden',
  },
  urlInput: {
    borderWidth: 1,
    borderColor: '#cdcdcd',
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 18,
    flex: 1,
    borderRadius: 10,
    outlineWidth: 0
  },
  submitButton: {
    paddingHorizontal: 10, 
    paddingVertical: 20,
    backgroundColor: 'red',
    borderRadius: 10
  },

  statsContainer: {
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 10,
  } 
})

export default HomeScreen;
