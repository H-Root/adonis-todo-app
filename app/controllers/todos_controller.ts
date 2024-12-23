import TodoService from '#services/todo_service'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TodosController {
  constructor(protected todoService: TodoService) {}

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createTodoValidator, {
      meta: {
        user_id: auth.user!.id,
      },
    })

    // const todo = await this.todoService.createTodo(payload)
    const todo = await auth.user!.related('todos').create(payload)

    return response.created(todo)
  }

  async update({ params, request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(updateTodoValidator, {
      meta: {
        id: params.id,
        user_id: auth.user!.id,
      },
    })

    const todo = await this.todoService.updateTodo(params.id, payload)

    if (!todo) {
      return response.notFound({ message: 'Todo not found' })
    }
    return response.ok(todo)
  }

  async index({ response, auth }: HttpContext) {
    const todos = await auth.user!.related('todos').query()
    return response.ok(todos)
  }

  async destroy({ params, response, auth }: HttpContext) {
    const userId = auth.user!.id

    const todo = await this.todoService.getTodoById(params.id)

    if (!todo) {
      return response.notFound()
    }

    if (userId !== todo.userId) {
      return response.forbidden('You are not allowed to delete this resource')
    }

    await todo.delete()

    return response.noContent()
  }
}
