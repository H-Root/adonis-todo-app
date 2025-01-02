import TestNotification from '#mails/test_notification'
import mail from '@adonisjs/mail/services/main'
import { Job } from '@rlanz/bull-queue'

interface DelayedJobPayload {
  email: string
}

export default class DelayedJop extends Job {
  // This is the path to the file that is used to create the job
  static get $$filepath() {
    return import.meta.url
  }

  /**
   * Base Entry point
   */
  async handle(payload: DelayedJobPayload) {
    await mail.send(new TestNotification(payload.email))
  }

  /**
   * This is an optional method that gets called when the retries has exceeded and is marked failed.
   */
  async rescue(_payload: DelayedJobPayload) {}
}
