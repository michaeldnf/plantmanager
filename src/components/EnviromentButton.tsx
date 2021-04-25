import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { 
  RectButton, 
  RectButtonProps 
} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends RectButtonProps {
  title: string;
  active?: boolean; //O ? quer dizer que o param não é obrigatório
}

export function EnviromentButton({
  title, 
  active = false,
  ... rest
}: ButtonProps) {

  return (
    <RectButton style={[
      styles.button,
      active && styles.buttonActive
      ]} {... rest}
    >
      <Text style={[
        styles.buttonText,
        active && styles.buttonTextActive
      ]}>
        {title}
      </Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5
  },

  buttonActive: { backgroundColor: colors.green_light },

  buttonText: {
    color: colors.heading,
    fontFamily: fonts.text,
  },

  buttonTextActive: { 
    fontFamily: fonts.heading,
    color: colors.green_dark,
  }
});