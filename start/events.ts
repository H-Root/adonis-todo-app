import emitter from '@adonisjs/core/services/emitter'
const SendVerificationEmail = () => import('#listeners/send_verification_email')

emitter.on('user:registered', [SendVerificationEmail, 'handle'])

emitter.on('todo:list_todo', function (todos) {
  console.log(todos)
})
