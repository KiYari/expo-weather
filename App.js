import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Nav from './Routes/Nav';
import About from './Routes/About'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <View style={classes.container}>
        <Button
          title="Go to today's weather forecast"
          onPress={() => navigation.navigate('Today')}
        />
      </View>
      <View style={classes.container}>
        <Button
          title="Go to 5 days weather forecast"
          onPress={() => navigation.navigate('5 Days')}
        />
      </View>
    </View>
  );
}


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Today" component={Nav} />
        <Stack.Screen name="5 Days" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const classes = StyleSheet.create({
  container: {
    width: 260,
    marginTop: 8,
  },
});

export default App;
