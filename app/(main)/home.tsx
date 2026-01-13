import EmptyStatsArea from '@/components/emptyStatsArea';
import Header from '@/components/header';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const [inputText, setInputText] = useState("");
  const [data, setData]           = useState();

  // const onSubmitButtonClicked = async () => {
  //   if (inputText.trim() === '') {
  //     window.alert('Impossivel encontrar video! Nenhum link foi inserido.')
  //     return;
  //   }

  //   const id = (inputText.split('=')).at(1); // Extrai o ID do video a partir do link fornecido no input
  //   const params = {
  //     part: 'snippet,statistics',
  //     id: id,
  //     key: 'AIzaSyCcMdiXy4YjWy40ClBSmdp6MEbchRNMHz8'
  //   };
  //   const queryString = new URLSearchParams(JSON.stringify(params)); 

  //   const fetchedData = await fetch(`https://corsproxy.io/?https://developers.google.com/youtube/v3/docs/videos?${queryString}`);

  //   console.log(fetchedData);
  // }

  const onSubmitButtonClicked = async () => {
    if (inputText.trim() === '') {
      alert('Impossível encontrar vídeo! Nenhum link foi inserido.');
      return;
    }

    // Extrai ID de vários formatos do YouTube
    const match = inputText.match(
      /(?:v=|youtu\.be\/|embed\/|shorts\/)([0-9A-Za-z_-]{11})/
    );

    if (!match) {
      alert('Link do YouTube inválido.');
      setInputText("");
      return;
    }

    const videoId = match[1];

    const params = {
      part: 'snippet,statistics',
      id: videoId,
      key: 'AIzaSyCcMdiXy4YjWy40ClBSmdp6MEbchRNMHz8',
    };

    const queryString = new URLSearchParams(params).toString();

    const url ='https://www.googleapis.com/youtube/v3/videos?' + queryString;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
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
            autoFocus={true}
          />
          <TouchableOpacity style={styles.submitButton} onPress={ () => { onSubmitButtonClicked() } }>
            <Ionicons style={{
              color: 'white',
              fontSize: 30
            }} name='arrow-forward-sharp' />
          </TouchableOpacity>
        </View>

        {
          (false) ? (
            <EmptyStatsArea />
          ) : (
            <ScrollView style={styles.statsContainer} contentContainerStyle={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
