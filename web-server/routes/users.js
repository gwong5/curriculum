const url = require('url')
const bodyParser = require('body-parser')
const queries = require('../../database/queries')
const commands = require('../../database/commands')

module.exports = app => {

  app.get('/users', (request, response, next) => {
    request.backOffice.getActiveLearners().then(users => {
      response.json(users)
      return
      response.render('users/index', { users })
    })
    .catch(next)
  })

  app.get('/users/:handle', (request, response, next) => {
    const { handle } = request.params
    request.backOffice.getLearnerByHandle(handle).then(user => {
      if (!user) return response.renderNotFound()
      response.render('users/show', { user })
    })
    .catch(next)
  })
}
