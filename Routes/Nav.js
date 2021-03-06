import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { picked_city } from './Nav';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addData } from '../components/FriendsActions';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import city from '../components/saved'

class HomeScreen extends React.Component {
  constructor() {
    super();

    let city = "Vladivostok";

    this.state = {
      data: [[]],
      city: "Vladivostok",
      _city: "Vladivostok",
      day: new Date(),
      date: [],
    }
    this.weather();
    console.log(this.state.day)
    this.getDate(this.state.day);
  }

  weather =() => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.state._city + '&appid=acceb6b6e7d088d76859f1755a08afa3').then(response => response.json()).then(data => {
      var to_content = []
      var to_icons = []
      for( let i = 0; i < 7; i++) {
        to_content.push({
          temperature: "Temperature: " + Math.ceil(data['list'][i]['main']['temp']-273)+ "°C",
          feels_like: "Feels like: " + Math.ceil(data['list'][i]['main']['feels_like']-273) + "°C",
          description: data['list'][i]['weather'][0]['description'],
          icon: data['list'][i]['weather'][0]['icon']
        })
      }
      this.setState({
        data: to_content,
        city: data['city']['name']
      })
    }).catch(err => alert("Wrong city name!"))
  }

  handleChange = (val) => {
    this.state._city = val
  }

  getDate = (d) => {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    weekday[7] = "Sunday";
    weekday[8] = "Monday";
    weekday[9] = "Tuesday";
    weekday[10] = "Wednesday";
    weekday[11] = "Thursday";
    weekday[12] = "Friday";
    weekday[13] = "Saturday";
    let n = []
    for (let i=0; i < 7; i++) {
      n.push(weekday[d.getDay()+i])
    }
    return n;
  }

  render() {
      return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5d6080'}}>
        <Image style={{opacity: 0.6,position: 'absolute', width:'100%', height:'100%', resizeMode: 'stretch',}} source={require('../components/bg.jpg')} />

        <View>
          <View style={classes.containerInput}>
            <TextInput onChangeText={(val) => this.handleChange(val)} style={classes.input} placeholder='Enter city'/>
              <View style={classes.buttonContainer}>
                <Button onPress={() => this.weather()} title='proceed'/>
              </View>
          </View>
        </View>
          <Text>{this.state.city}</Text>
          <View style={classes.nonOppa}>
            {
              this.state.data.map((item, index) => (
                <View key={index}style={classes.textItem}>
                  <View style={classes.datItem}>
                    <Text style={{color: "#fff",}}>{this.getDate(this.state.day)[index]}</Text>
                  </View>

                  <View>
                  </View>
                  <Text style={{color: "#fff",}}>{item['temperature']}</Text>
                  <Text style={{color: "#fff",}}>{item['feels_like']}</Text>
                  <Text style={{color: "#fff",}}>{item['description']} <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data[0].icon + '@2x.png' }} style={{ width: 32, height: 16 }} /></Text>
                </View>

              ))
            }
          </View>
        <View style={classes.opaqueCont}>
        </View>

      </View>
    );
  }
}


const mapStateToProps = (state) => {
  const { friends } = state
  return { friends }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addData,
  }, dispatch)
);




const classes = StyleSheet.create({
  input: {
    flex: 5,
    height: 40,
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    padding: 4,
    borderColor: '#2b2fff',
    width: 356,
  },
  buttonContainer: {
    height: 40,
    marginLeft: 15,
  },
  containerInput: {
    width: 356,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    width: 260,
    marginTop: 8,
    opacity: 0.8,
  },
  textItem: {
    borderColor: '#ffb5f6',
    borderWidth: 2,
    borderRadius: 6,
    margin: 8,
    padding: 8,
  },
  datItem: {
    borderColor: '#ffb5f6',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 6,
  },
  nonOppa: {
    top: 25,
    justifyContent: 'center',
    position: "absolute",
    margin: 120,
    width: 500,
    height: 850,
  },
  opaqueCont: {
    opacity: 0.1,
    backgroundColor: '#e3e3e3',
    margin: 30,
    width: 500,
    height: 900,
    alignItems: 'center',
    borderRadius: 25,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
