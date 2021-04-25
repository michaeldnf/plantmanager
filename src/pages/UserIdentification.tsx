import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/core';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isText, setIsText] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  async function handleSubmit() {
    if (!name) return Alert.alert('Me diz como chamar você 😢');
    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate('Confirmation', {
        title: 'Prontinho',
        subTitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
        buttonTitle: 'Começar',
        icon: 'smile',
        nextScreen: 'PlantSelect'
      });
    } catch {
      Alert.alert('Não foi possível salvar o seu nome 😢');
    }
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsText(!!name);
  }

  function handleInputFocus() { setIsFocused(true) }

  function handleInputChange(value: string) {
    setIsText(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  {isText ? '😄' : '😀'}
                </Text>
                <Text style={styles.title}>Como podemos{'\n'}chamar você?</Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isText) && { borderColor: colors.green }
                ]}
                placeholder="Digite um nome"
                placeholderTextColor={colors.gray}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />

              <View style={styles.footer}>
                <Button title="Confirmar" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.background
  },

  content: {
    flex: 1,
    width: '100%'
  },

  header: { alignItems: 'center' },

  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54
  },

  emoji: { fontSize: 44 },

  title: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 32,
    marginTop: 20
  },

  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center'
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20
  }
});