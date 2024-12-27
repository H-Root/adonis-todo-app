import User from '#models/user'

export default class SendVerificationEmail {
  handle(user: User) {
    console.log(user)
    // Send email
  }
}
