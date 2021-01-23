import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

export default class Nav extends React.Component {
  constructor() {
    super();
    var city;

    this.state = {
      data: [[],[],[],[],[]],
      cond_icon: []
    }
  }

  search_city = (props) => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.city + '&appid=acceb6b6e7d088d76859f1755a08afa3').then(response => response.json()).then(data => {
      var to_content = []
      var to_icons = []
      for( let i = 0; i < 5; i++) {
        to_content.push({
          cityname: data['city']['name'],
          temperature: Math.ceil(data['list'][i]['main']['temp']-273),
          feels_like: Math.ceil(data['list'][i]['main']['feels_like']-273),
          humidity: data['list'][i]['main']['humidity'],
          pressure: data['list'][i]['main']['pressure'],
          description: data['list'][i]['weather'][0]['description'],
          icon: data['list'][i]['weather'][0]['icon']
        })
      }
      this.setState({
        data: to_content,
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
        <View style={classes.cont}>
          <Text>{this.state.data[0].cityname}</Text>
        </View>
        <View style={classes.containerInput}>
          <TextInput onChangeText={(val) => this.handleChange(val)} style={classes.input} placeholder='Enter city'/>
          <View style={classes.buttonContainer}>
            <Button onPress={() => this.search_city()} title='proceed'/>
          </View>
        </View>
        <View style={classes.textContainer}>
          <Text>СЕГОДНЯ</Text>
          <Text>temperature: {this.state.data[0].temperature}</Text>
          <Text>feels like: {this.state.data[0].feels_like}</Text>
          <Text>humidity: {this.state.data[0].humidity}</Text>
          <Text>pressure: {this.state.data[0].pressure}</Text>
          <Text>description: {this.state.data[0].description} <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data[0].icon + '@2x.png' }} style={{ width: 32, height: 16 }} /></Text>
        </View>
        <View style={classes.textContainer}>
          <Text>ЗАВТРА</Text>
          <Text>temperature: {this.state.data[1].temperature}</Text>
          <Text>feels like: {this.state.data[1].feels_like}</Text>
          <Text>humidity: {this.state.data[1].humidity}</Text>
          <Text>pressure: {this.state.data[1].pressure}</Text>
          <Text>description: {this.state.data[1].description} <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data[1].icon + '@2x.png' }} style={{ width: 32, height: 16 }} /></Text>
        </View>
        <View style={classes.textContainer}>
          <Text>ПОСЛЕЗАВТРА</Text>
          <Text>temperature: {this.state.data[2].temperature}</Text>
          <Text>feels like: {this.state.data[2].feels_like}</Text>
          <Text>humidity: {this.state.data[2].humidity}</Text>
          <Text>pressure: {this.state.data[2].pressure}</Text>
          <Text>description: {this.state.data[2].description} <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data[2].icon + '@2x.png' }} style={{ width: 32, height: 16 }} /></Text>
        </View>
        <View style={classes.textContainer}>
          <Text>ПОСЛЕПОСЛЕЗАВТРА</Text>
          <Text>temperature: {this.state.data[3].temperature}</Text>
          <Text>feels like: {this.state.data[3].feels_like}</Text>
          <Text>humidity: {this.state.data[3].humidity}</Text>
          <Text>pressure: {this.state.data[3].pressure}</Text>
          <Text>description: {this.state.data[3].description} <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data[3].icon + '@2x.png' }} style={{ width: 32, height: 16 }} /></Text>
        </View>
        <View style={classes.textContainer}>
          <Text>ПОСЛЕПОСЛЕПОСЛЕЗАВТРА</Text>
          <Text>temperature: {this.state.data[4].temperature}</Text>
          <Text>feels like: {this.state.data[4].feels_like}</Text>
          <Text>humidity: {this.state.data[4].humidity}</Text>
          <Text>pressure: {this.state.data[4].pressure}</Text>
          <Text>description: {this.state.data[4].description} <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data[4].icon + '@2x.png' }} style={{ width: 32, height: 16 }} /></Text>
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
    marginTop: 36,
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
    borderColor: 'black',
    borderTopWidth: 2,
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
  cont: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
