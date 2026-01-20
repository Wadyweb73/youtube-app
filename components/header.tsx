import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Header = () => {
  return (
    <View style={styles.menuBar}>
      <TouchableOpacity style={styles.backButton} onPress={ () => router.replace('/(main)') }>
        <Ionicons style={{
          color: 'white',
          fontSize: 20
        }} name='arrow-back-sharp' />

        <Text style={{
          fontSize: 20,
          color: 'white'
        }}>Voltar</Text>
      </TouchableOpacity>

      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 20
      }}>
        <TouchableOpacity style={styles.backButton} onPress={ () => router.replace('/history') }>
          <Ionicons style={{
            color: 'white',
            fontSize: 35
          }} name='time-outline' />
        </TouchableOpacity>
{/* 
        <View style={styles.iconContainer}>
          <Ionicons style={{
            textAlign: 'center',
            color: 'white'
          }} name="logo-youtube" color={'red'} size={20}/>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    height: 60,
    backgroundColor: 'red',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconContainer: {
    width: 40,
    height: 40,
    padding: 2,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
  },
})

export default Header;
