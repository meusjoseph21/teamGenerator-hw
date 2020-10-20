const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

function mainFunc(){
    promptManager()
    function promptManager(){
        return inquirer.prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "managerID"
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "managerEmail"
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "managerOffice"
            },
        ]).then(function (response){
            console.log(response)
            const manager = new Manager (response.managerName, response.managerID, response.managerEmail, response.managerOffice)
            employees.push(manager)
            continueQuestions()
        })
    }

    function continueQuestions(){
        return inquirer.prompt({
            type: "list",
            message: "What type of Employee is next?",
            name: "employeeType",
            choices: ["Engineer", "Intern", "Done"]
        }).then(function (response){
            console.log(response)
            switch(response.employeeType){
                case "Engineer" : promptEngineer()
                    break
                case "Intern": promptIntern()
                    break
                default: makeHTML()
            }
        })
    }

    function promptEngineer(){
        return inquirer.prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "engineerID"
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is your github Username?",
                name: "engineerGithub"
            },
        ]).then(function (response){
            console.log(response)

            const engineer = new Engineer(response.engineerName, response.engineerID, response.engineerEmail, response.engineerGithub)

            employees.push(engineer)

            continueQuestions()

        })
    }

    function promptIntern(){
        return inquirer.prompt([
            {
                type: "input",
                message: "What is your name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is your ID?",
                name: "internID"
            },
            {
                type: "input",
                message: "What is your email address?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What school did you attend?",
                name: "internSchool"
            },
        ]).then(function (response){
            console.log(response)

            const intern = new Intern(response.internName, response.internID, response.internEmail, response.internSchool)

            employees.push(intern)

            continueQuestions()

        })
    }

    function makeHTML(){
        const html = render(employees)
        fs.writeFile(outputPath, html, function(err){
            if (err) {
                console.log (err)
            }
        })
    }
}

mainFunc()



