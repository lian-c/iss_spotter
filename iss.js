/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error,null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
   
    const nonstring = JSON.parse(body); //give the object
    const result = nonstring.ip; // takes just the ip key to return the value as a string
    return callback(null, result); //remember to use null as it takes two parameters
    
  });
};
const fetchMyIPTest = function() {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return error;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return Error(msg);
    }
   
    const nonstring = JSON.parse(body); //give the object
    const result = nonstring.ip; // takes just the ip key to return the value as a string
    return (result); //remember to use null as it takes two parameters
    
  });
};

const fetchCoordsByIP = function(ip) {

request(`http://ipwho.is/${ip}`, (error, response,body) => {
  const {latitude, longitude} = JSON.parse(body) 
  const result = {latitude, longitude}
  console.log(result)
})
  
};

fetchCoordsByIP("50.98.71.238")
fetchCoordsByIP(fetchMyIPTest())
module.exports = { fetchMyIP, fetchCoordsByIP };