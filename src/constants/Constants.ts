import {Appearance, Dimensions, TextStyle} from 'react-native';

type FontWeight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

const isDarkMode = Appearance.getColorScheme() === 'dark';
const FontConstants = {
  familyRegular: 'sans-serif',
  sizeTitle: 18,
  sizeSmall: 12,
  sizeRegular: 14,
  sizeLarge: 16,

  weightBold: 'bold' as FontWeight,
  weightSemiBold : '600' as FontWeight,
  weightExtraBold: '900' as FontWeight,
};
const ColorConstants = {
  background: isDarkMode ? '#333333' : '#efefef',
  backgroundMedium: isDarkMode ? '#666666' : '#dddddd',
  backgroundLight: isDarkMode ? 'gray' : 'gray',
  font: isDarkMode ? '#eeeeee' : '#222222',
  warning30: '#EB144C',
  green30: '#7BDCB5',
  black300: '#C2CEDC',
  black500: '#5C646C',
  black700: '#3A444E',

};
const SizeConstants = {
  paddingSmall: 2,
  paddingRegular: 8,
  paddingLarge: 16,
  borderRadius: 8,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
};
export {FontConstants, ColorConstants, SizeConstants};
