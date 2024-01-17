import {StyleSheet} from 'react-native';

// @theme
import {Pallet, FontSizes, FontNames} from '../../theme';

const styles = StyleSheet.create({
  eventCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    height: 200,
  },
  imageStyle: {borderRadius: 20},
  contentCard: {
    backgroundColor: Pallet.black,
    opacity: 0.6,
    flex: 1,
    padding: 15,
    borderRadius: 20,
  },
  imageBackground: {
    borderRadius: 20,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleCard: {
    fontSize: FontSizes.Medium,
    fontFamily: FontNames.TextExtraBold,
    maxWidth: 320,
  },
  originCard: {
    fontFamily: FontNames.TextLight,
    marginBottom: 8,
    fontSize: FontSizes.Small,
  },
  animatedView: {
    flex: 1,
  },
  eventlocation: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 4,
  },
});

export default styles;
