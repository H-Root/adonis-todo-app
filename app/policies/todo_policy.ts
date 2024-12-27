import User from '#models/user'
import Todo from '#models/todo'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class TodoPolicy extends BasePolicy {
  create(): AuthorizerResponse {
    return true
  }

  update(user: User, todo: Todo): AuthorizerResponse {
    if (user.id !== todo.userId) {
      return false
    }

    return true
  }

  delete(user: User, todo: Todo): AuthorizerResponse {
    if (user.id !== todo.userId) {
      return false
    }

    return true
  }
}
