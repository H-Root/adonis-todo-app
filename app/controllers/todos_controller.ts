import TodoService from '#services/todo_service'
import { createTodoValidator, toggleIsFinishedTodo, updateTodoValidator } from '#validators/todo'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TodosController {
  constructor(protected todoService: TodoService) {}

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTodoValidator)

    const todo = await this.todoService.createTodo(payload)

    return response.created(todo)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(updateTodoValidator, {
      meta: {
        id: params.id,
      },
    })

    const todo = await this.todoService.updateTodo(params.id, payload)

    if (!todo) {
      return response.notFound({ message: 'Todo not found' })
    }
    return response.ok(todo)
  }

  async patch({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(toggleIsFinishedTodo, {
      meta: {
        id: params.id,
      },
    })

    const todo = await this.todoService.updateTodo(params.id, payload)

    if (!todo) {
      return response.notFound({ message: 'Todo not found' })
    }
    return response.ok(todo)
  }

  async index({ response }: HttpContext) {
    const todos = await this.todoService.getAllTodos()
    return response.ok(todos)
  }

  async destroy({ params, response }: HttpContext) {
    const deleted = await this.todoService.deleteTodo(params.id)
    if (!deleted) {
      return response.notFound({ message: 'Todo not found' })
    }
    return response.noContent()
  }
}
