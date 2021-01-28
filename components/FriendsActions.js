export const addFriend = friendsIndex => (
  {
    type: 'ADD_FRIEND',
    payload: friendsIndex,
  }
);


export const addCity = cityIndex => (
  {
    type: 'ADD_CITY',
    payload: cityIndex,
  }
);

export const addData = dataIndex => (
  {
    type: 'ADD_DATA',
    payload: dataIndex,
  }
);
