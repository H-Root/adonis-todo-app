import FetchUsers from '#events/fetch_users'
import UserRegistered from '#events/user_registered'
import UserService from '#services/user_service'
import { createUserValidator, signInValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'
import queue from '@rlanz/bull-queue/services/main'
import DelayedJop from '../jobs/delayed_job.js'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const cachedUsers = await redis.get('users')
    if (!cachedUsers) {
      const users = await this.userService.getAllUsers()
      FetchUsers.dispatch()
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 2000)
      })
      return response.ok(users)
    }
    return response.ok(JSON.parse(cachedUsers as string))
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const newUser = await this.userService.createUser(payload)
    queue.dispatch(DelayedJop, { email: payload.email })
    UserRegistered.dispatch(newUser)
    FetchUsers.dispatch()
    return response.created(newUser)
  }

  /**
   * Validate user
   */
  async validate({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signInValidator)
    try {
      const token = await this.userService.signin(payload)
      if (!token) {
        return response.forbidden()
      }
      return token
    } catch (error) {
      return response.forbidden()
    }
  }

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  // async destroy({ params }: HttpContext) {}
}
