import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Image, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { picked_city } from './Nav';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addData } from '../components/FriendsActions';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Nav from './Navi'
import city from '../components/saved'

class HomeScreen extends React.Component {
  constructor() {
    super();

    let city = "Vladivostok";

    this.state = {
      data: [[]],
      _data: [[]],
      city: "Vladivostok",
      _city: "Vladivostok",
      displayWeather: false,
      degree: 0,
      pos: [-35, -10]
    }
    this.weather();
  }
  aweather =() => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + this.state._city + '&appid=acceb6b6e7d088d76859f1755a08afa3').then(response => response.json()).then(data => {
      let to_content=[];
      for( let i = 0; i < 7; i++) {
        to_content.push({
          temperature: "Temperature: " + Math.ceil(data['list'][i]['main']['temp']-273)+ "°C",
        })
      }
      this.setState({
        _data: to_content,
      })
      {this.rad()}
    }).catch(err => alert("Wrong city nameee!"))
  }

  rad = () => {
    let all_time = 86400;
    let date = new Date;
    let seconds = date.getHours()*3600+date.getMinutes()*60+date.getSeconds();
    let knowledge = [[-35, -160],[[-72, -152]], [-109, -140], [-146, -98], [-156, -88], [-165, -78],  [-175, -48], [-185, -10],
                      [-175, 0], [-172, 20], [-168, 30], [-165, 50], [-155, 70], [-135, 90], [-105, 120], [-80, 130], [-70, 130],
                    [-65, 134], [-60, 136], [-50, 136.2], [-35, 136.5]]

    let part = Math.floor(seconds/4114.2857142857142857);
    console.log(part)
    this.setState({pos: knowledge[part]})
  }

  weather =() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ this.state._city +'&appid=acceb6b6e7d088d76859f1755a08afa3').then(response => response.json()).then(data => {
      console.log(data)
      this.setState({city: this.props.friends.current})
      var to_content = {
        cityname: data['name'],
        temperature: Math.ceil(data['main']['temp'] - 273),
        description: data['weather'][0]['description'],
        feels_like:  Math.ceil(data['main']['feels_like'] - 273),
        humidity: data['main']['humidity'],
        pressure: data['main']['pressure'],
        icon: data['weather'][0]['icon'],
        speed: data['wind']['speed']
      }
      this.setState({data: to_content, city: data['name'], degree: data['wind']['deg']})
      this.aweather();
      console.log(this.state.degree)
    }).catch(err => alert("Wrong city name!"))
  }

  handleChange = (val) => {
    this.state._city = val
  }

  render() {
      return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#5d6080'}}>
        <Image style={{opacity: 0.35, position: 'absolute', width:'100%', height:'100%', resizeMode: 'stretch',}} source={require('../components/bg.jpg')} />
        <View>
          <View style={classes.containerInput}>
            <TextInput onChangeText={(val) => this.handleChange(val)} style={classes.input} placeholder='Enter city'/>
              <View style={classes.buttonContainer}>
                <Button onPress={() => this.weather()} title='proceed'/>
              </View>
          </View>
        </View>
        <Text style={{color: "#fff",}}>{this.state.city}</Text>
        <View style={classes.nonOppa}>
          <Text style={{fontSize: 108, textAlign: 'center', color:"#ffffff"}}>{this.state.data.temperature}°C </Text>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: "#fff",}}>{this.state.data.description}
            </Text>
          </View>

          <View style={classes.centerItem}>

            <View style={classes.leftCenter}>
              <Text style={{color: "#fff",}}>Pressure</Text>
              <Text style={{color: "#fff",}}>{this.state.data.pressure} P</Text>
              <Text></Text>
                <Text style={{color: "#fff",}}>Wind</Text>
                <Text style={{color: "#fff",}}>{this.state.degree}°</Text>
                <Text style={{color: "#fff",}}>{this.state.data.speed} m\s</Text>
            </View>

            <View style={classes.center}>
              <Image source={{ uri: 'http://openweathermap.org/img/wn/' + this.state.data.icon + '@2x.png' }} style={{top:-200, width: 256, height: 128 }} />
              <Image style={{position: 'absolute', top: -50, left:60, transform: [{ rotate: this.state.degree.toString()+'deg'}], width:128, height:256, resizeMode: 'stretch',}} source={require('../components/upArrow.png')} />
            </View>

            <View style={classes.rightCenter}>
              <Text style={{color: "#fff",}}>Humidity</Text>
              <Text style={{color: "#fff",}}>{this.state.data.humidity} %rh</Text>
            </View>

          </View>

        </View>


        <View style={classes.opaqueCont}>
          <View style={classes.container}>
          </View>
        </View>
        {
          this.state.displayWeather && (
            <View>
              <View style={{position: 'absolute', top: -313, left: -20}}>
                <Button title='close' onPress={() => this.setState({displayWeather: false})}/>
              </View>
              <Nav data={this.state._data}/>
            </View>
          )
        }
        {
          !this.state.displayWeather && (
            <View style={{position: 'absolute', bottom: 4}}>
              <Button title="open" onPress={() => this.setState({displayWeather: true})}/>
              <Image style={{position: 'absolute', top: -150, left: -130, width:300, height:150, resizeMode: 'stretch',}} source={require('../components/duga.png')} />
              <Image source={{ uri: 'http://openweathermap.org/img/wn/01d@2x.png' }} style={{position:'absolute', top: this.state.pos[0], left: this.state.pos[1], width: 64, height: 64 }} />
            </View>
          )
        }
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
  bBox1: {
  },
  bar: {
    position: "absolute",
    bottom: 43,
    opacity: 0.8
  },
  topItem: {
    top: 500,
    left: 120,
  },
  centerItem: {
    top: 300,
    left: 250
  },
  center: {
    left: -135,
    top: -80,
  },
  leftCenter: {
    left: -230,
  },
  rightCenter: {
    top: -220,
    left: 150,
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
  nonOppa: {
    position: "absolute",
    margin: 60,
    width: 500,
    height: 850,
  },
  opaqueCont: {
    opacity: 0.2,
    backgroundColor: '#e3e3e3',
    margin: 30,
    width: 500,
    height: 900,
    alignItems: 'center',
    borderRadius: 25,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
