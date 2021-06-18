const {randomTemperatureFull} = require('./update')

a = randomTemperatureFull();

initModel = {
    choice: "Use arrow keys",
    location:"Santiago,CL",
    temp: a[0],
    max: a[1],
    min: a[2]
}

module.exports = {
    initModel
}
