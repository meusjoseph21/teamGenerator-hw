const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const employee = require('../lib/Employee')

class Engineer extends employee{
    constructor(name,id,email,github){
        super(name,id,email)
        this.github = github
    }

    getRole(){
        return "Engineer"
    }

    getGithub(){
        return this.github
    }
}

module.exports = Engineer