import FetchUsers from '#events/fetch_users'
import UserRegistered from '#events/user_registered'
import emitter from '@adonisjs/core/services/emitter'
const InvalidateCache = () => import('#listeners/invalidate_cache')
const SendVerificationEmail = () => import('#listeners/send_verification_email')

// emitter.on('user:registered', [SendVerificationEmail, 'handle'])
emitter.on(UserRegistered, [SendVerificationEmail])

emitter.on(FetchUsers, [InvalidateCache])

emitter.on('todo:list_todo', function (todos) {
  console.log(todos)
})
