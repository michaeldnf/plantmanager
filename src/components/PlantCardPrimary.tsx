import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

import {
  RectButton,
  RectButtonProps
} from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function PlantCardPrimary({ data, ...rest }: PlantProps) {
  return (
    <RectButton style={styles.button} {...rest}>
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.buttonText}>{data.name}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxWidth: '45%',
    height: 154,
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 10
  },

  buttonText: {
    color: colors.textCard,
    fontFamily: fonts.heading,
    marginVertical: 16
  }
});