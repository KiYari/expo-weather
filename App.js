import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import friendsReducer from './components/FriendsReducer';
import HomeScreen from './Routes/HomeScreen';
import Nav from './Routes/Nav'
import FriendsScreen from './Routes/FriendsScreen'

const Drawer = createDrawerNavigator();
const store = createStore(friendsReducer);

export default function App() {
  var piska = "piska"
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="7 day weather" component={Nav} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
