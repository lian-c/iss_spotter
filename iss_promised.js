// iss_promised.js
const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

/*
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(coords) {
  const object = JSON.parse(coords);
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${object.latitude}&lon=${object.longitude}`)
};

const nextISSTimesForMyLocation = function(){
  
}
module.exports = { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes };