import { BaseMail } from '@adonisjs/mail'

export default class TestNotification extends BaseMail {
  from = 'support@example.com'
  subject = 'Welcome Test'

  constructor(private user: string) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  prepare() {
    this.message.to(this.user).html(`<h1>Hello Test</h1>`)
  }
}
