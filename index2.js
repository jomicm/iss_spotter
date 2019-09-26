const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(passTimes => printPassTimes(passTimes))
  .catch((err) => {
    console.log("It didn't work: ", err.message);
  });

const  printPassTimes = passTimes => {
  passTimes.map(times => console.log(`Next pass at ${new Date(1000 * times.risetime)} for ${times.duration} seconds!`));
};