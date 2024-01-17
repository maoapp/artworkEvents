import {Pallet, FontNames, FontSizes} from './theme';

export const theme = {
  colors: {
    primary: Pallet.orangeVariant,
  },
  Button: {
    titleStyle: {
      color: Pallet.black,
      fontFamily: FontNames.TextRegular,
      fontSize: FontSizes.ExtraMedium,
    },
    containerStyle: {
      height: 50,
      borderRadius: 5,
    },
  },
  Text: {
    style: {
      fontFamily: FontNames.TextRegular,
      color: Pallet.white,
      FontSizes: FontSizes.Normal,
    },
  },
};
