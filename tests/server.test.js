const request = require('supertest')
const expect = require('chai').expect
const {app} = require('./../server.js')

const {Todo} = require('./../models/todo')
const {User} = require('./../models/user')

beforeEach((done) => {
  Todo.remove({}).then(() => {
    done()
  })
})

beforeEach((done) => {
  User.remove({}).then(() => {
    done()
  })
})

describe('POST /todos', () => {

  it('should create a new Todo with all fields', (done) => {
    let newTodo = {text: 'This is a valid todo', completed: false, completedAt: Date.now()}
    request(app)
    .post('/todos')
    .send({text: 'This is a todo'})
    .end((err, res) => {
      if (err) return done(err)
      Todo.find().then((todos) => {
        expect(todos.length).to.equal(1)
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })

  it('should be able to create a new Todo with only mandotory fields', (done) => {
    let newTodo = {text: 'This is the only mandotory field'}
    request(app)
    .post('/todos')
    .send(newTodo)
    .end((err, res) => {
      if (err) return done(err)

      Todo.find().then((todos) => {
        expect(todos.length).to.equal(1)
        done()
      }).catch(err => done(err))
    })
  })

  it('should responded with status 201 for a VALID request', (done) => {
    let newTodo = {text: 'this is a todo'}
    request(app)
    .post('/todos')
    .send(newTodo)
    .expect(201, done)
  })

  // it('should contain the new Todo in the response object', (done) => {
  //
  // })

  it('should NOT create a new Todo with missing mandotory fields', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .end((err, res) => {
      if (err) return done(err)

      Todo.find().then((todos) => {
        expect(todos.length).to.equal(0)
        done()
      }).catch(err => done(err))
    })
  })


  it('should responded with status 400 for a bad request', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400, done)
  })

  // it('should NOT create a new Todo with incorrect field format', (done) => {
  //
  // })

})

describe('POST /users', () => {

  it('should create a new user with all fields', (done) => {
    let newuser = {email: 'hotmail.com'}
    request(app)
    .post('/users')
    .send({email: 'This is a user'})
    .end((err, res) => {
      if (err) return done(err)
      User.find().then((users) => {
        expect(users.length).to.equal(1)
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })

  it('should be able to create a new user with only mandotory fields', (done) => {
    let newuser = {email: 'hotmail.com'}
    request(app)
    .post('/users')
    .send(newuser)
    .end((err, res) => {
      if (err) return done(err)

      User.find().then((users) => {
        expect(users.length).to.equal(1)
        done()
      }).catch(err => done(err))
    })
  })

  it('should responded with status 201 for a VALID request', (done) => {
    let newuser = {email: 'hotmail.com'}
    request(app)
    .post('/users')
    .send(newuser)
    .expect(201, done)
  })

  // it('should contain the new user in the response object', (done) => {
  //
  // })

  it('should NOT create a new user with missing mandotory fields', (done) => {
    request(app)
    .post('/users')
    .send({})
    .end((err, res) => {
      if (err) return done(err)

      User.find().then((users) => {
        expect(users.length).to.equal(0)
        done()
      }).catch(err => done(err))
    })
  })


  it('should responded with status 400 for a bad request', (done) => {
    request(app)
    .post('/users')
    .send({})
    .expect(400, done)
  })

  // it('should NOT create a new user with incorrect field format', (done) => {
  //
  // })

})
