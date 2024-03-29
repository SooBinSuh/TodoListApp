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

const FontConstants = {
  familyRegular: 'sans-serif',
  sizeTitle: 18,
  sizeSmall: 12,
  sizeRegular: 14,
  sizeLarge: 16,

  weightBold: 'bold' as FontWeight,
  weightSemiBold: '600' as FontWeight,
  weightExtraBold: '900' as FontWeight,
};

const AsyncConstants = {
  completedTodoIDs: 'completedIds',
};

const ColorConstants = {
  background: '#efefef',
  backgroundMedium: '#dddddd',
  backgroundLight: 'gray',
  font: '#222222',
  warning30: '#EB144C',
  green30: '#7BDCB5',
  black300: '#C2CEDC',
  black500: '#5C646C',
  black700: '#3A444E',

  primary: '#668CFF',
};
const SizeConstants = {
  paddingSmall: 2,
  paddingRegular: 8,
  paddingLarge: 16,
  borderRadius: 8,
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,

  bottomButtonHeight: 50,
};
export {FontConstants, ColorConstants, SizeConstants, AsyncConstants};
