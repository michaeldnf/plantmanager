import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/core';
import { Entypo } from '@expo/vector-icons';
import wateringImg from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'} suas plantas de{'\n'} forma fácil
        </Text>

        <Image
          source={wateringImg}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Text>
            <Entypo name="chevron-right" style={styles.buttonIcon} />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20
  },

  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    textAlign: 'center',
    lineHeight: 34,
    color: colors.heading,
    marginTop: 38
  },

  image: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.text,
    paddingHorizontal: 20,
    color: colors.heading
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },

  buttonIcon: {
    color: colors.white,
    fontSize: 32
  }
});