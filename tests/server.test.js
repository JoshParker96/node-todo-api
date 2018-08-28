const expect = require('chai').expect
var chai = require('chai'), chaiHttp = require('chai-http');
const {app} = require('./../server.js')
chai.use(chaiHttp)

const {Todo} = require('./../models/todo')

beforeEach((done) => {
  Todo.remove({}).then(() => {
    done()
  })
})

describe('POST /todos', () => {

  it('should create a new Todo with all correctly formatted fields', (done) => {
    let newTodo = {text: 'This is a valid todo', completed: false, completedAt: Date.now()}
    chai.request(app)
    .post('/todos')
    .send(newTodo)
    .end((err, res) => {
      if (err) return done(err)
      Todo.find().then((todos) => {
        expect(todos.length).to.equal(1)
        expect(res.status).to.equal(201)
        done()
      }).catch((err) => {
        done(err)
      })
    })
  })

  it('should be able to create a new Todo with only mandotory fields', (done) => {
    let newTodo = {text: 'This is a mandotory field'}
    chai.request(app)
    .post('/todos')
    .send(newTodo)
    .end((err, res) => {
      if (err) return done(err)
      Todo.find().then((todos) => {
        expect(todos.length).to.equal(1)
        expect(res.status).to.equal(201)
        done()
      }).catch(err => done(err))
    })
  })


  it('should NOT create a new Todo with missing mandotory fields', (done) => {
    chai.request(app)
    .post('/todos')
    .send({})
    .end((err, res) => {
      if (err) return done(err)
      Todo.find().then((todos) => {
        expect(todos.length).to.equal(0)
        expect(res.status).to.equal(400)
        done()
      }).catch(err => done(err))
    })
  })
  // it('should NOT create a new Todo with incorrect field format', (done) => {
  //
  // })

  // it('response object contents', (done) => {
  //
  // })

})
