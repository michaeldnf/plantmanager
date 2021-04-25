import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import userImage from '../assets/user.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem('@plantmanager:user');
      setUserName(user || '');
    }
    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image source={userImage} style={styles.image}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getStatusBarHeight(),
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },

  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 40
  },
});