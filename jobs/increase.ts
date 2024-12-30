import { BaseJob } from '#types/job'
import redis from '@adonisjs/redis/services/main'

export default class IncreaseJob extends BaseJob {
  async run() {
    const count = await redis.get('count')

    if (!count) {
      await redis.set('count', 0)
      return
    }
    await redis.set('count', +count + 1)
  }
}
