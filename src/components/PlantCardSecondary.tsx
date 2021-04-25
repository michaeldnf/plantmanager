import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';

import {
  RectButton,
  RectButtonProps,
} from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import { SvgFromUri } from 'react-native-svg'
import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export function PlantCardSecondary({ data, handleRemove, ...rest }: PlantProps) {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton
              style={styles.buttonRemove}
              onPress={handleRemove}
            >
              <Feather name="trash" size={32} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.title}>{data.name}</Text>

        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.time}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 25,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    marginVertical: 5
  },

  buttonRemove: {
    width: 120,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 35,
    paddingHorizontal: 25,
    position: 'relative',
    right: 30
  },

  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.heading
  },

  details: { alignItems: 'flex-end' },

  timeLabel: {
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.body_light
  },

  time: {
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark
  }
});