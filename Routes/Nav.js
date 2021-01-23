import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Nav extends React.Component {
  constructor() {
    super();
    var city;

    this.state = {
      data: [[]],
      cond_icon: ''
    }
  }

  search_city = (props) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&appid=acceb6b6e7d088d76859f1755a08afa3').then(response => response.json()).then(data => {
      var to_content = []
      to_content.push({
        cityname: data['name'],
        temperature: Math.ceil(data['main']['temp'] - 273),
        description: data['weather'][0]['description'],
        feels_like: Math.ceil(data['main']['feels_like'] - 273),
        country: data['sys']['country'],
        humdity: data['main']['humidity'],
        pressure: data['main']['pressure'],
        icon: data['weather'][0]['icon']
      })

      this.setState({
        data: to_content,
        cond_icon: 'http://openweathermap.org/img/wn/' + to_content[0].icon + '@2x.png',
      })
      console.log(to_content)
    }).catch(err => alert("Wrong city name!"))
  }

  handleChange = (val) => {
    this.city = val
  }

  render() {

    return (
      <View style={classes.container}>
        <View style={classes.containerInput}>
          <TextInput onChangeText={(val) => this.handleChange(val)} style={classes.input} placeholder='Enter city'/>
          <View style={classes.buttonContainer}>
            <Button onPress={() => this.search_city()} title='proceed'/>
          </View>
        </View>
        <View style={classes.textContainer}>
          <Text>Cityname: {this.state.data[0].cityname}</Text>
          <Text>Temperature: {this.state.data[0].temperature}</Text>
          <Text>Feels like: {this.state.data[0].feels_like}</Text>
          <Text>Humidity: {this.state.data[0].humdity}</Text>
          <Text>Pressure: {this.state.data[0].pressure}</Text>
          <Text>Description: {this.state.data[0].description} <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data[0].icon + '@2x.png' }} style={{ width: 32, height: 16 }} /></Text>
        </View>
    </View>)
  }
}

const classes = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#ffebef',
  },
  containerInput: {
    marginTop: 48,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    height: 40,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#edfffe',
    fontSize: 36,
  },
  input: {
    flex: 5,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    padding: 4,
    borderColor: '#2b2fff',
    width: 356,
  },
});
