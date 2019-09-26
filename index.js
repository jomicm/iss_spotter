const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error)  return console.log("It didn't work!", error);
  passTimes.map(times => console.log(`Next pass at ${new Date(1000 * times.risetime)} for ${times.duration} seconds!`));
});