const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss_promised");

fetchMyIP()
  .then(fetchCoordsByIP) // so we don't need the () to call function
  .then(fetchISSFlyOverTimes)
  .then(body => console.log(body)); //originally just put console.log() and it worked but updated it
