/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');
const { URL_GETMYIP, URL_GETMYCOORDS, URL_GETMYCOORDSINVALID, URL_ISSPASS } = require('./constants');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(URL_GETMYIP, (err, response, data) => {
    // if non-200 status, assume server error
    if (err)  callback(err, null);
    else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${data}`;
      callback(Error(msg), null);
      return;
    } else {
      const ip = JSON.parse(data).ip;
      callback(null, ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(URL_GETMYCOORDS, (err, response, data) => {
    // if non-200 status, assume server error
    if (err)  callback(err, null);
    else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${data}`;
      callback(msg, null);
      return;
    } else {
      const coords = JSON.parse(data);
      callback(null, {lat: coords.data.latitude, lon: coords.data.longitude});
    }
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(URL_ISSPASS, { qs: coords }, (err, response, data) => {
    // if non-200 status, assume server error
    if (err)  callback(err, null);
    else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS PASS. Response: ${data}`;
      callback(msg, null);
      return;
    } else {
      const isspass = JSON.parse(data).response;
      callback(null, isspass);
    }
  });
};

const nextISSTimesForMyLocation = function(callback) {
  // empty for now
  fetchMyIP((err, ip) => {
    if (err) {
      callback(("IP didn't work!" , err), null);
      return;
    }
    console.log('IP worked! Returned:' , ip);
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        callback(("Coords didn't work!" , err), null);
        return;
      }
      console.log('Coords worked! Returned:' , coords);
      fetchISSFlyOverTimes(coords, (err, isspass) => {
        if (err) {
          callback(("ISS PASS didn't work!" , err), null);
          return;
        }
        //console.log('ISS PASS worked! Returned:' , isspass);
        callback(err, isspass);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };