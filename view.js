const figlet = require('figlet')
const chalk = require('chalk')
const inquirer = require('inquirer')

//Title
function getTitle(){
    return chalk.cyan(
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
    const {location, temp, max, min} = model
    return [{Name: location,Temperature: temp,Max: max,Min: min},]
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