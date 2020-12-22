export const addData = (name, temp, weather, tempMin, tempMax) => {
      return {
        type: "ADD_DATA",
        payload: {
          name,
          temp,
          weather,
          tempMin,
          tempMax
        },
      };  
  };
  
  