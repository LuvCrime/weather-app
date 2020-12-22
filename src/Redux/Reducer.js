const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        name: action.payload.name,
        temp: action.payload.temp,
        weather: action.payload.weather,
        tempMin: action.payload.tempMin,
        tempMax: action.payload.tempMax,
      }; 
    default:
      return state;
  }
};

export default reducer;
