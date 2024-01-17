import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import {Provider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';

// @store
import {store} from './src/store';

// @navigation vendors
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// @screens
import FavoritesScreen from './src/screens/FavoritesScreen/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import DetailScreen from './src/screens/DetailScreen/DetailScreen';

// @theme
import {theme} from './src/mainTheme';
import {FontNames, FontSizes, Pallet} from './src/theme';

// @assets
const homeIcon = require('./src/assets/svg/home');
const favoritesIcon = require('./src/assets/svg/favorite');

const App = () => {
  const StackScreen = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const MyTabs = () => (
    <Tab.Navigator
      initialRouteName="Artwork"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: Pallet.blackGray,
        tabBarInactiveTintColor: Pallet.primaryColor,
        activeBackgroundColor: Pallet.grayVariant,
        inactiveBackgroundColor: Pallet.grayVariant,
        labelStyle: {
          fontFamily: FontNames.TextSemiBold,
          fontSize: FontSizes.Small,
        },
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: Pallet.grayVariant,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarIcon: ({focused}) => {
          let icon = 'home';
          if (route.name === 'Artwork') {
            icon = homeIcon;
          }
          if (route.name === 'Favorites') {
            icon = favoritesIcon;
          }
          return (
            <SvgUri
              fill={focused ? Pallet.blackGray : Pallet.primaryColor}
              height={18}
              width={18}
              svgXmlData={icon}
            />
          );
        },
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Artwork"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Favorites"
        component={FavoritesScreen}
      />
    </Tab.Navigator>
  );

  const HomeStackScreen = () => (
    <StackScreen.Navigator initialRouteName="Home">
      <StackScreen.Screen
        name="Home"
        component={MyTabs}
        options={{headerShown: false}}
      />
      <StackScreen.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </StackScreen.Navigator>
  );

  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <Provider store={store}>
          <NavigationContainer>
            <HomeStackScreen />
          </NavigationContainer>
        </Provider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
