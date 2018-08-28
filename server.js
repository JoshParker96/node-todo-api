
// TODO: add Schemas
// TODO: config nodemon
// TODO: Decide relations between models nad implement

// TODO: seperate APis into seperate routes
// TODO: seperate/add middleware

/* TODO:  add unit tests (TDD approach to confirm future implementations)
  -update and delete APIs return requested update/delete user/todo
  -Error handling
  -server error handling
  -one to many relations
  -server log?*/
// TODO: resolve all failed unit test
/* TODO: refactor and confrim test work
  -hard coded values
  -add routes
  -abstract methods*/
// TODO: Update READ.ME

const {app} = require('./app')
const {Todo} = require('./models/todo');
const {mongoose} = require('./db/mongoose');


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

app.put('/todos/:id', (req, res) => {
  return Todo.findByIdAndUpdate(req.params.id, {text: req.body.text}, function(err, raw) {
    if (err) {return err}
    return raw
  }).then((raw) => {
    let jsonResponse = {'success': true}
    let status = 200
    res.status(status).json(jsonResponse)
  }).catch((err) => {
    // handle update error
    // handle server error
    console.log("=====this is somehtginfdjkghdskjln");
    console.log(err);
    let jsonResponse = {'success': false, serverError: false}
    let status = 404
    if (err.name === 'CastError') {
      jsonResponse['message'] = 'User does not exist'
    }
    res.status(status).json(jsonResponse)
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

app.listen(3000, () => {
  console.log("App listing on port 3000");
})

module.exports = {app}
