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
      return callback(error, null);
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


const fetchCoordsByIP = function(ip, callback) {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const object = JSON.parse(body);

    if (object.success === false) {
      const msg = `Unsuccessful, message: ${object.message} with IP ${object.ip}, please check the IP address or try again`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = object; //grabs only lat and long within the object but are separated variables
    const result = { latitude, longitude }; //allows us to put it back into an object
    return callback(null, result);
  });

};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    const object = JSON.parse(body);

    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS times : ${body}`;
      return callback(Error(msg), null);
      
    }
    const result = object.response;
    return callback(null, result);
  });
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results.
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => { //gives the ip address
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
    fetchCoordsByIP(ip,(error, coords) => { //takes the ip address gives lat/long and within the IP function
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
    
      fetchISSFlyOverTimes(coords, (error, ISS) => {//takes the lat long and provies risetime within the lat long func
        if (error) {
          console.log("It didn't work!", error);
          return;
        }
        
        return callback(null, ISS);
      });
    });

  });
  
};

const times = function (array){
  array.forEach(element => {
  const date = Date(element.risetime); // oo https://www.w3schools.com/js/js_dates.asp
  console.log(`Next pass at ${date} for ${element.duration} seconds!`);
});
}

module.exports = { nextISSTimesForMyLocation , times };

