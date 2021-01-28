import { combineReducers } from 'redux';
import React from 'react';

const INITIAL_STATE = {
  current: ["Vladivostok"],
  possible: [
    'Vladivostok',
    'Rome',
    'Boston',
  ],
  w_data: {cityname: '0',
          temperature: 0,
          description: '0',
          feels_like: 0,
          humidity: 0,
          pressure: 0,
          icon: '0'}
};

const friendsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'ADD_FRIEND':
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const {
        current,
        possible,
        w_data,
      } = state;

      // Pull friend out of friends.possible
      // Note that action.payload === friendIndex
      const addedFriend = possible[action.payload];
      // And put friend in friends.current
      current.shift()
      current.push(addedFriend);

      // Finally, update the redux state
      const newState = { current, possible };
      console.log("ADD_FRIND COMPLETED")

      return newState;

      case 'ADD_CITY':


        const addedCity = action.payload
        state['possible'].push(addedCity);
        console.log('ADD CITY COMPLETED')
        return state;

        case 'ADD_DATA':


          const addedData = action.payload
          console.log(addedData)
          // Finally, update the redux state
          console.log('ADD CITY COMPLETED')
          return state;

      default:
        return state
  }

};

export default combineReducers({
  friends: friendsReducer
});
