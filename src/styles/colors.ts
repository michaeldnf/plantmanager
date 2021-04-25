import { Appearance } from 'react-native-appearance';

const colorsLight = {
  green: '#32B768',
  green_dark: '#2B7A4B',
  green_light: '#DAF2E4',

  heading: '#52665A',
  body_dark: '#738078',
  body_light: '#AAB2AD',

  textCard: '#2B7A4B',
  backgroundCard: '#F0F0F0',
  background: '#FFFFFF',
  backgroundTabBar: '#FOFOFO',
  shape: '#F0F0F0',
  white: '#FFFFFF',
  gray: '#CFCFCF',

  blue: '#3D7199',
  blue_light: '#EBF6FF',

  red: '#E83F5B',
}

const colorsDark = {
  green: '#32B768',
  green_dark: '#2B7A4B',
  green_light: '#DAF2E4',

  heading: '#F0F0F0',//52665A
  body_dark: '#FFFFFF',//738078
  body_light: '#AAB2AD',
  textCard: '#F0F0F0',
  backgroundCard: '#52665A',
  backgroundTabBar: '#3A3A3A',
  background: '#202020',
  shape: '#52665A',
  white: '#FFFFFF',
  gray: '#B4B4B4',//CFCFCF

  blue: '#B2DDFF',
  blue_light: '#0F61A1',

  red: '#E83F5B',
}

const colorScheme = Appearance.getColorScheme();
const colors = colorScheme == 'light' ? colorsLight : colorsDark;

export default colors;