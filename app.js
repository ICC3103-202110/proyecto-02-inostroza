const {inputForm, listForm} = require('./view')
const {printTable} = require('console-table-printer')
const axios = require('axios')

// Impure
async function app(state, update, view){
    while (true){
        const {model, currentView} = state
        const {title, table} = currentView
        // I/O
        console.clear()
        console.log(title)
        printTable(table)
        // FORM (Ask user input)
        const {choice} = await listForm(model)
        const {location} = await inputForm(model,choice)

        
        //GETTING WEATHER API DATA
        const info = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c1f90f9d85403a92ecef6128d2f1227b`).then(response => {
        a = ''
        const tempera = response.data.main.temp
        const maxt = response.data.main.temp_max
        const mint = response.data.main.temp_min
        return([tempera,maxt,mint])
        }).catch(error => a='',console.log("",''));
        console.log(a)


        const temp = info[0]
        const max = info[1]
        const min = info[2]
        //console.log(choice,location)
        const updatedModel = update(choice, location, temp, max, min, model)
        
        //console.log(model)
        state = {
            ...state,
            model: updatedModel,
            currentView: view(updatedModel)
        }
    }
}

module.exports = {
    app
}
