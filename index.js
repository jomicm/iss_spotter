const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("IP didn't work!" , err);
    return;
  }
  console.log('IP worked! Returned:' , ip);
  fetchCoordsByIP(ip, (err, coords) => {
    if (err) {
      console.log("Coords didn't work!" , err);
      return;
    }
    console.log('Coords worked! Returned:' , coords);
    fetchISSFlyOverTimes(coords, (err, isspass) => {
      if (err) {
        console.log("ISS PASS didn't work!" , err);
        return;
      }
      console.log('ISS PASS worked! Returned:' , isspass);
    });
  });
});