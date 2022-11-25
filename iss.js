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
    if (error){
      return callback(error,null); 
    }
    // console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
   
      const nonstring = JSON.parse(body)
      const result = nonstring.ip
      return callback(null, result); //remember to use null as it takes two parameters 
    
  });
}

module.exports = { fetchMyIP };