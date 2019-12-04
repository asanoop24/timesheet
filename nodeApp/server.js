const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();
console.log(`Your env is ${process.env.NODE_ENV}`);

// const env = process.env.NODE_ENV;
// console.log(`Your port is ${env}`);

var port = 3000;
var host = '0.0.0.0';
// var host = '127.0.0.1';
var app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://34.93.143.209');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// var connection = mysql.createConnection({
//   host     : process.env.RDS_HOSTNAME | 'localhost',
//   user     : process.env.RDS_USERNAME | 'admin',
//   password : process.env.RDS_PASSWORD | 'password',
//   port     : process.env.RDS_PORT | 3306
// });

// var mysqlx = require('@mysql/xdevapi');

// // Connect to server on localhost
// var config = {
//   user: 'root',
//   password: 'Summer24',
//   host: 'localhost',
//   port: '33060'
// }
// mysqlx.getSession(config)
// .then(session => session.getSchemas()
//   .then(schema => console.log(schema)))
// .catch(e => console.log(e));


var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USERNAME,
  password : process.env.MYSQL_PASSWORD,
  port     : 3306
});
// var connection = mysql.createConnection({
//   // host     : 'timesheet.csejzry7iz7k.ap-south-1.rds.amazonaws.com',
//   host     : 'adhocs:asia-south1:timesheet',
//   user     : 'admin',
//   password : 'password',
//   port     : 3306
// });


connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

// app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

app.get('/', (request, response, next) => {
  console.log('RECEIVED');
  // var sql = "INSERT INTO timesheet.employees (employee_id, employee_name) VALUES ?";
  // var sql = "INSERT INTO timesheet.employees SET ?";
  // var employee = {
  //   employee_id: 101,
  //   employee_name: 'B'
  // }
  // // var values = [
  // //   [1, 'Anoop Sharma'],
  // //   [2, 'Anant Kumar']
  // // ];
  // connection.query(sql, [employee], (error, result) => {
  //   if(error) console.log({error: error});
  //   console.log(result);
  //   // connection.end();
  //   response.status(200).send({message: 'Inserted Records'});
  // })
})

app.post('/login', (request, response, next) => {
  console.log(request.body);
  var email = request.body.email;
  var password = request.body.password;
  console.log(email, password);
  var sql = `SELECT * FROM timesheet.employees WHERE employee_email="${email}" AND employee_password="${password}"`;
  connection.query(sql, (error, result) => {
    if(error) console.log({error: error});
    else if(result.length == 0){
      response.status(400).send({error: 'user not found'});
    }
    else {
      console.log(result);
      response.status(200).send({employee: result});
    }
  })
})

app.post('/updateTimesheet', (request, response, next) => {
  var tasks = request.body.tasks;
  console.log(tasks);
  values = [];
  for(let i=0; i< tasks.length; i++){
    values.push([
      tasks[i].date,
      tasks[i].employee_id,
      tasks[i].employee_name,
      tasks[i].project_id,
      tasks[i].project_name,
      tasks[i].task_id,
      tasks[i].task_name,
      tasks[i].time_spent
    ]);
  }
  let employee_id = tasks[0].employee_id;
  var sql = `DELETE FROM timesheet.timesheet WHERE employee_id = ${employee_id}`;
  connection.query(sql, (error, result) => {
    if(error) console.log({error: error});
    console.log('deleted the records', sql);
    sql = "INSERT INTO timesheet.timesheet VALUES ?";
    connection.query(sql, [values], (error, result) => {
      if(error) console.log({error: error});
      // console.log(result);
      console.log('inserted the records', sql);
      // connection.end();
      response.status(200).send({message: 'Inserted Records'});
    });
    // connection.end();
    // response.status(200).send({message: 'Inserted Records'});
  });
  // console.log(values);
})

app.get('/fetchTimesheet', (request, response, next) => {
  console.log(request.headers.employeeid);
  var employee_id = request.headers.employeeid;
  console.log(employee_id);
  var sql = `SELECT * FROM timesheet.timesheet WHERE employee_id=${employee_id}`;
  connection.query(sql, (error, data) => {
    if(error) console.log({error: error});
    // console.log(data[0]['project_name']);
    // connection.end();
    response.status(200).send({message: 'Inserted Records', data: data});
  })
})

app.get('/fetchDates', (request, response, next) => {
  var sql = 'SELECT * FROM timesheet.dates';
  connection.query(sql, (error, data) => {
    if(error) console.log({error: error});
    // console.log(data[0]['project_name']);
    // connection.end();
    response.status(200).send({message: 'Inserted Records', data: data});
  })
})

app.get('/fetchTimesheetByReportees', (request, response, next) => {
  var employee_id = request.headers.employeeid;
  var start_date = request.headers.startdate;
  var end_date = request.headers.enddate;
  console.log(employee_id, start_date, end_date);
  var timesheet = `SELECT * FROM timesheet.timesheet WHERE date BETWEEN '${start_date}' AND '${end_date}' AND (employee_id = ${employee_id} OR employee_id IN (SELECT DISTINCT employee_id FROM timesheet.employees WHERE manager_id=${employee_id}))`;
  connection.query(timesheet, (error, data) => {
    if(error) console.log({error: error});
    console.log(data);
    // connection.end();
    response.status(200).send({message: 'Inserted Records', data: data});
  })
})

app.get('/fetchProjects', (request, response, next) => {
  var timesheet = `SELECT * FROM timesheet.projects`;
  connection.query(timesheet, (error, data) => {
    if(error) console.log({error: error});
    console.log(data);
    // connection.end();
    response.status(200).send({message: 'Inserted Records', data: data});
  })
})

app.post('/updateProjects', (request, response, next) => {
  var projects = request.body.projects;
  console.log(projects);
  values = [];
  for(let i=0; i< projects.length; i++){
    values.push([
      projects[i].project_id,
      projects[i].project_name
    ]);
  }
  var sql = `TRUNCATE TABLE timesheet.projects`;
  connection.query(sql, (error, result) => {
    if(error) console.log({error: error});
    sql = "INSERT INTO timesheet.projects VALUES ?";
    connection.query(sql, [values], (error, result) => {
      if(error) console.log({error: error});
      sql = "UPDATE timesheet.timesheet A LEFT JOIN timesheet.projects B ON A.project_id = B.project_id SET A.project_name = B.project_name";
      connection.query(sql, (error, result) => {
        if(error) console.log({error: error});
        console.log('updated the records', sql);
        // connection.end();
        response.status(200).send({message: 'Inserted Records'});
      });  
      console.log('inserted the records', sql);
      // connection.end();
      // response.status(200).send({message: 'Inserted Records'});
    });
    // connection.end();
    // response.status(200).send({message: 'Inserted Records'});
  });
})

app.get('/fetchEmployees', (request, response, next) => {
  var employees = `SELECT * FROM timesheet.employees`;
  connection.query(employees, (error, data) => {
    if(error) console.log({error: error});
    console.log(data);
    // connection.end();
    response.status(200).send({message: 'Inserted Records', data: data});
  })
})

app.post('/updateEmployees', (request, response, next) => {
  var employees = request.body.employees;
  console.log(employees);
  values = [];
  for(let i=0; i< employees.length; i++){
    values.push([
      employees[i].employee_id,
      employees[i].employee_name,
      employees[i].employee_email,
      employees[i].employee_password,
      employees[i].employee_role,
      employees[i].manager_id,
      employees[i].manager_name
    ]);
  }
  var sql = `TRUNCATE TABLE timesheet.employees`;
  connection.query(sql, (error, result) => {
    if(error) console.log({error: error});
    sql = "INSERT INTO timesheet.employees VALUES ?";
    connection.query(sql, [values], (error, result) => {
      if(error) console.log({error: error});
      // console.log(result);
      console.log('inserted the records', sql);
      // connection.end();
      response.status(200).send({message: 'Inserted Records'});
    });
    // connection.end();
    // response.status(200).send({message: 'Inserted Records'});
  });
})

app.listen(port, host, () => {
    console.log(`Server is running on ${host} at ${port}`);
})

module.exports.app = app;
