// index.js
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  passTimes.forEach(element => {
    const date = Date(element.risetime); // oo https://www.w3schools.com/js/js_dates.asp
    console.log(`Next pass at ${date} for ${element.duration} seconds!`);
  });
  
});

// //////previous testings////////////////
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

// fetchISSFlyOverTimes({ latitude: 53.9170641, longitude: -122.7496693 }, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('Blast off! Returned data:', data);
// });