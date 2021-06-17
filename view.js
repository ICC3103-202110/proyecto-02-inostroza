const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')
const {randomTemperatureFull} = require('./update')
temporalTable = []
nothing = []
//Title
function getTitle(){
    return chalk.yellow(
        figlet.textSync(
            'Weather App',
            {
                horizontalLayout: 'full',
                font: 'Nancyj-Underlined'
            }
        )
    )
}

//Get Table
function getTable(model){
    const {choice, location, temp, max, min} = model
    if(temporalTable.length === 0){
        temporalTable.push({Name: location,Temperature: temp,Max: max,Min: min})
    }

    else if(choice==="Add city"){
        temporalTable.push({Name: location,Temperature: temp,Max: max,Min: min})
    }

    else if(choice==="Delete city"){
        nombre = location
        newlist = []
        size = temporalTable.length
        for(i=0;i<size;i++){
        if(String(temporalTable[i].Name) === nombre){
            console.log(temporalTable[i].Name,"was deleted")
        }
        else{
            newlist.push(temporalTable[i])
        }
        }
        temporalTable = newlist.slice(0)
        newlist = nothing.slice(0)
    }

    else if(choice==="Update city"){
        console.log("Update or delete")
        b = randomTemperatureFull();
    }
    return temporalTable
}

// INPUT FORM
function inputForm(model){
    const {location} = model
    const message = 'Location?'
    return inquirer.prompt([
        {
            name: 'location',
            type: 'input',
            message: message,
            default: "Santiago",
            validate: function(value){
                if (typeof value === 'string'){
                    return true
                }
                else {
                    return 'Enter a valid city name'
                }
            }
        }
    ])
}

// LIST FORM INITIAL
function listForm(model){
    const {choice} = model
    const message = 'Select Action:'
    const choices = ['Add city', 'Update city', 'Delete city']
    return inquirer.prompt([{
        name: 'choice',
        type: 'list',
        message: message,
        default: choice,
        choices: choices
    }
    ])
}

// Get actual console view
function view(model){
    return {
        title: getTitle(),
        table: getTable(model)
    }
}

module.exports = {
    view,
    inputForm,
    listForm,
}