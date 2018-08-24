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
  let newTodo = new Todo(req.body)

  newTodo.save().then((doc) => {
    let jsonResponse = {'success': true, 'data': doc}
    res.status(201).json(jsonResponse)
  }).catch((err) => {
    let jsonResponse = {success: false, serverError: false, errors: err.errors, message: err.message}
    res.status(400).json(jsonResponse)
  })
})

app.post('/users', (req, res) => {
  let newUser = new User(req.bod)

  newUser.save().then((doc) => {
    let jsonResponse = {'success': true, 'data': doc}
    res.status(201).json(jsonResponse)
  }).catch((err) => {
    let jsonResponse = {'success': false, errors: err.errors, 'message': err.message}
    res.status(400).json(jsonResponse)
  })
})
