// index.js
const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP("50.98.71.238",(error, data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned data:' , data);
// });

fetchISSFlyOverTimes({latitude: 53.9170641, longitude: -122.7496693},(error, data) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('Blast off! Returned data:' , data);
});