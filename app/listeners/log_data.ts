import User from '#models/user'

export default class LogData {
  handle(user: User) {
    console.log(user)
    // Send email
  }
}
