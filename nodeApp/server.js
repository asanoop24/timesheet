const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

var port = 3000;
var app = express();

// var connection = mysql.createConnection({
//   host     : process.env.RDS_HOSTNAME | 'localhost',
//   user     : process.env.RDS_USERNAME | 'admin',
//   password : process.env.RDS_PASSWORD | 'password',
//   port     : process.env.RDS_PORT | 3306
// });
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : 'password',
  port     : 3306
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

app.get('/', (request, response, next) => {
  // var sql = "INSERT INTO timesheet.employees (employee_id, employee_name) VALUES ?";
  var sql = "INSERT INTO timesheet.employees SET ?";
  var employee = {
    employee_id: 101,
    employee_name: 'B'
  }
  // var values = [
  //   [1, 'Anoop Sharma'],
  //   [2, 'Anant Kumar']
  // ];
  connection.query(sql, [employee], (error, result) => {
    if(error) console.log({error: error});
    console.log(result);
    // connection.end();
    response.status(200).send({message: 'Inserted Records'});
  })
})

app.post('/updateTimesheet', (request, response, next) => {
  var tasks = request.body.tasks;
  console.log(tasks);
  values = [];
  for(let i=0; i< tasks.length; i++){
    values.push([tasks[i].date, 1062136, 'Anoop Sharma', 1, tasks[i].projectName, 1, tasks[i].name, tasks[i].timeSpent]);
  }
  var sql = "INSERT INTO timesheet.timesheet VALUES ?";
  console.log(values);
  connection.query(sql, [values], (error, result) => {
    if(error) console.log({error: error});
    console.log(result);
    // connection.end();
    response.status(200).send({message: 'Inserted Records'});
  })
})

app.get('/fetchTimesheet', (request, response, next) => {
  console.log(request.headers.employeeid);
  var employee_id = request.headers.employeeid;
  console.log(employee_id);
  var sql = `SELECT * FROM timesheet.timesheet WHERE employee_id=${employee_id}`;
  // console.log(values);
  connection.query(sql, (error, result) => {
    if(error) console.log({error: error});
    console.log(result);
    // connection.end();
    response.status(200).send({message: 'Inserted Records'});
  })
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})

module.exports.app = app;
