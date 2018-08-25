const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

app.use(bodyParser.json())

app.listen(3000, () => {
  console.log("App listing on port 3000");
});

app.post('/todos', (req, res) => {
  Todo.create(req.body).then((doc) => {
    let jsonResponse = {'success': true, 'data': doc}
    res.status(201).json(jsonResponse)
  }).catch((err) => {
    let jsonResponse = {success: false, serverError: false, errors: err.errors, message: err.message}
    res.status(400).json(jsonResponse)
  })
})

app.post('/users', (req, res) => {
  User.create(req.body).then((doc) => {
    let jsonResponse = {'success': true, 'data': doc}
    res.status(201).json(jsonResponse)
  }).catch((err) => {
    let jsonResponse = {'success': false, errors: err.errors, 'message': err.message}
    res.status(400).json(jsonResponse)
  })
})

app.get('/users', (req, res) => {
  return User.find().then((users) => {
    let jsonResponse = {'success': true, 'data': users}
    let status = 200
    res.status(status).json(jsonResponse)
  }).catch((err) => {
    let jsonResponse = {'success': false, 'message': 'No users found'}
    let status = 404
    res.status(status).json(jsonResponse)
  })
})
