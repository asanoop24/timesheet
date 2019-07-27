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
  host     : '127.0.0.1',
  user     : 'admin',
  password : 'password',
  port     : 3306
});
// var connection = mysql.createConnection({
//   host     : 'timesheet.csejzry7iz7k.ap-south-1.rds.amazonaws.com',
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

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({extended: false}));

app.get('/', (request, response, next) => {
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
    console.log(result);
    connection.query(sql, [values], (error, result) => {
      if(error) console.log({error: error});
      console.log(result);
      // connection.end();
      response.status(200).send({message: 'Inserted Records'});
    });
    // connection.end();
    // response.status(200).send({message: 'Inserted Records'});
  });
  console.log(values);
  var sql = "INSERT INTO timesheet.timesheet VALUES ?";
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


app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})

module.exports.app = app;
