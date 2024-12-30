import User from '#models/user'
import redis from '@adonisjs/redis/services/main'

export default class InvalidateCache {
  async handle() {
    const data = await User.all()
    await redis.set('users', JSON.stringify(data))
  }
}
