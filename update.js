function randomTemperatureFull(){
    let temperatura1 = Math.random() * 35;
    let temperatura2 = parseFloat(temperatura1.toFixed(2));
    let maxtemperatura = parseFloat(temperatura2 + 3 + (Math.random()*5)).toFixed(2);
    let mintemperatura = parseFloat(temperatura2 - 3 - (Math.random()*5)).toFixed(2);
    return [temperatura2, maxtemperatura, mintemperatura]
}

function update(choice2, location2, temp2, max2, min2, model){
    const {choice, location, temp, max, min} = model
    return {
        ...model,
        choice: choice2,
        location: location2,
        temp: temp2,
        max: max2,
        min: min2,
    }
}

module.exports = {
    update,
    randomTemperatureFull
}