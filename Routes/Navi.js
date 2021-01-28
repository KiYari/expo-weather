import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { picked_city } from './Nav';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addData } from '../components/FriendsActions';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';
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
      <View style={classes.container}>
        <View style={classes.nonOppa}>
          {
            this.state.data.map((item, index) => (
              <View key={index}style={classes.textItem}>
                <View>
                </View>
                <Text style={{color: "#fff",}}>{this.getDate(this.state.day)[index]}: {this.props.data[index].temperature}</Text>
              </View>

            ))
          }
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
  container: {
    top: -280,
    left: -200,
    width: 400,
    height: 300,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5d6080',
  },
  nonOppa: {
    display: 'none',
    justifyContent: 'center',
    position: "absolute",
    width: 400,
    height: 300,
  },
  textItem: {
    borderColor: '#ffb5f6',
    borderWidth: 2,
    borderRadius: 6,
    margin: 8,
  },
  datItem: {
    borderColor: '#ffb5f6',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 6,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
