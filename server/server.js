// resolve all comment in APIs
// refactor (hard coded vales, routes)
// seperate APis into seperate routes
// add one to many relationships (then update required APIs to return those relations)

// seperate/add middleware
// add server log

// add unit tests

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
    // handle create and server errors
    let jsonResponse = {success: false, serverError: false, errors: err.errors, message: err.message}
    res.status(400).json(jsonResponse)
  })
})

app.post('/users', (req, res) => {
  User.create(req.body).then((doc) => {
    let jsonResponse = {'success': true, 'data': doc}
    res.status(201).json(jsonResponse)
  }).catch((err) => {
    // handle create and server errors
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
    // handle server error
    let jsonResponse = {'success': false, serverError: true}
    let status = 404
    res.status(status).json(jsonResponse)
  })
})

app.get('/todos', (req, res) => {
  return Todo.find().then((todos) => {
    let jsonResponse = {'success': true, 'data': todos}
    let status = 200
    res.status(status).json(jsonResponse)
  }).catch((err) => {
    // handle server error
    let jsonResponse = {'success': false, serverError: true}
    let status = 404
    res.status(status).json(jsonResponse)
  })
})

app.put('/users/:id', (req, res) => {
  let userId = req.params.id
  return User.findById(userId).then((user) => {
    // update update function to req.body
    // return updated user
    let userId = {id: user.id}
    return User.update(userId, {email: req.body.email})
  }).then(() => {
    let jsonResponse = {'success': true}
    let status = 200
    res.status(status).json(jsonResponse)
  }).catch((err) => {
    // handle update error
    // handle server error
    console.log(err);
    let jsonResponse = {'success': false, serverError: false}
    let status = 404
    if (err.name === 'CastError') {
      jsonResponse['message'] = 'User does not exist'
    }
    res.status(status).json(jsonResponse)
  })
})

app.put('/todos/:id', (req, res) => {
  let todoId = req.params.id
  return Todo.findById(todoId).then((todo) => {
    // update update function to req.body
    // return updated user
    let todoId = {id: todo.id}
    return Todo.update(todoId, {email: req.body.email})
  }).then(() => {
    let jsonResponse = {'success': true}
    let status = 200
    res.status(status).json(jsonResponse)
  }).catch((err) => {
    // handle update error
    // handle server error
    console.log(err);
    let jsonResponse = {'success': false, serverError: false}
    let status = 404
    if (err.name === 'CastError') {
      jsonResponse['message'] = 'User does not exist'
    }
    res.status(status).json(jsonResponse)
  })
})

app.delete('/users/:id', (req, res) => {
  let userId = req.params.id
  return User.findById(userId).then((user) => {
    // return removed user
    return User.remove(user)
  }).then(() => {
    let jsonResponse = {'success': true}
    let status = 200
    res.status(status).json(jsonResponse)
  }).catch((err) => {
    console.log(err);
    // hanlde user can not be found error
    // hanlde delete error
    // handle server error

  })
})

app.delete('/todos/:id', (req, res) => {
  let todoId = req.params.id
  return Todo.findById(todoId).then((todo) => {
    // return removed todo
    return todo.remove(todo)
  }).then(() => {
    let jsonResponse = {'success': true}
    let status = 200
    res.status(status).json(jsonResponse)
  }).catch((err) => {
    console.log(err);
    // hanlde todo can not be found error
    // hanlde delete error
    // handle server error

  })
})
