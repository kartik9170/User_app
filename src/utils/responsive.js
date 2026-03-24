import { Dimensions, PixelRatio } from 'react-native';

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

export const wp = (percent) => {
  const { width } = Dimensions.get('window');
  return (width * percent) / 100;
};

export const hp = (percent) => {
  const { height } = Dimensions.get('window');
  return (height * percent) / 100;
};

export const scale = (size) => {
  const { width } = Dimensions.get('window');
  return (width / BASE_WIDTH) * size;
};

export const verticalScale = (size) => {
  const { height } = Dimensions.get('window');
  return (height / BASE_HEIGHT) * size;
};

export const moderateScale = (size, factor = 0.35) => size + (scale(size) - size) * factor;

export const fontScale = (size) => {
  const scaled = moderateScale(size, 0.4);
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
};

export const clamp = (value, min, max) => Math.max(min, Math.min(value, max));
