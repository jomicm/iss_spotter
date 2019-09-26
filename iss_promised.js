const request = require('request-promise-native');
const { URL_GETMYIP, URL_GETMYCOORDS, URL_GETMYCOORDSINVALID, URL_ISSPASS } = require('./constants');

const fetchMyIP = () => {
  return request(URL_GETMYIP);
};

const fetchCoordsByIP = ip => {
  return request(URL_GETMYCOORDS + ip);
};

const fetchISSFlyOverTimes = coords => {
  return request(URL_ISSPASS, { qs: coords });
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(body => {
      const ip = JSON.parse(body).ip;
      return fetchCoordsByIP(ip);
    })
    .then(body => {
      const coords = JSON.parse(body);
      return {lat: coords.data.latitude, lon: coords.data.longitude};
    })
    .then(coords => {
      return fetchISSFlyOverTimes(coords);
    })
    .then(data => {
      const isspass = JSON.parse(data).response;
      return isspass;
    });
};

module.exports = { nextISSTimesForMyLocation };
