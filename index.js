const inquirer = require("inquirer");
const fs = require("fs");

const employeeInfo = [
  {
    type: 'input',
    name: 'name',
    message: 'Employee Name'
  },
  {
    type: 'input',
    name: 'jobtitle',
    message: 'Job Title'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Contact Email'
  },
  {
    type: 'input',
    name: 'employeeNumber',
    message: 'Employee Number:'
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: 'Office Number:'
  }
];

const getEmployeeInfo = async (numEmployees) => {
  const employees = [];

  for (let i = 0; i < numEmployees; i++) {
    const { name, jobtitle, email, employeeNumber, officeNumber } = await inquirer.prompt(employeeInfo);
    employees.push({ name, jobtitle, email, employeeNumber, officeNumber });
  }

  return employees;
};

const employeeLogger = async () => {
  const employees = await getEmployeeInfo(5);

  let employeeHTML = '';
  employees.forEach((employee) => {
    employeeHTML += `
      <div class="employee">
        <p class="name">Name: ${employee.name}</p>
        <div>
          <p class="jobTitle">Job Title: ${employee.jobtitle}</p>
          <p class="email">Email: ${employee.email}</p>
          <p class="employeeNumber">Employee Number: ${employee.employeeNumber}</p>
          <p class="officeNumber">Office Number: ${employee.officeNumber}</p>
        </div>
      </div>
    `;
  });

  const fileContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Employee List</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
      </head>
      <body>
        ${employeeHTML}
      </body>
    </html>`;

  const filePath = './index.html';

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`The file was saved to ${filePath}`);
    }
  });
};

employeeLogger();
