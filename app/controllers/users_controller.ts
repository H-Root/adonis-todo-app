import UserService from '#services/user_service'
import { createUserValidator, signInValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const users = await this.userService.getAllUsers()
    return response.ok(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const newUser = await this.userService.createUser(payload)
    emitter.emit('user:registered', newUser)
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
