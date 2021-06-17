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
        nombre = location
        newlist = []
        b = randomTemperatureFull();
        size = temporalTable.length
        for(i=0;i<size;i++){
            if(String(temporalTable[i].Name) === nombre){
                temporalTable[i].Temperature = b[0]
                temporalTable[i].Max = b[1]
                temporalTable[i].Min = b[2]
                newlist.push(temporalTable[i])
            }
            else{
                newlist.push(temporalTable[i])
            }
        }
        temporalTable = newlist.slice(0)
        newlist = nothing.slice(0)
    }
    return temporalTable
}

// INPUT FORM
function inputForm(model,choice){
    const {location} = model
    const message = 'Location?'
    size = temporalTable.length
    if(size === 0) 
    {
        throw new Error("\u001b[1;31mUnable to delete or update from empty list \u001b[1;34mPLEASE RESTART\u001b[0m")
    }
    else if(choice==="Add city"){
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
    else{
        const {location} = model
        const message = 'Select location:'
        namelist = nothing.slice(0)
        for(i=0;i<size;i++){
        namelist.push(String(temporalTable[i].Name))
        }
        const choices = namelist
        return inquirer.prompt([{
            name: 'location',
            type: 'list',
            message: message,
            default: location,
            choices: choices
        }
        ])   
    }
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