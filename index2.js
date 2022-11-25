const { nextISSTimesForMyLocation } = require("./iss_promised");
const {times} = require("./iss");

nextISSTimesForMyLocation()
  .then((timeObj) => {
    times(timeObj);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });