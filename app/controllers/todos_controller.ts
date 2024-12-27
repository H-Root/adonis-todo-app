// not needed since we pre-register it in #policies/main.ts
// import TodoPolicy from '#policies/todo_policy'
import TodoService from '#services/todo_service'
import { createTodoValidator, toggleIsFinishedTodo, updateTodoValidator } from '#validators/todo'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import emitter from '@adonisjs/core/services/emitter'

@inject()
export default class TodosController {
  constructor(protected todoService: TodoService) {}

  async store({ request, response, auth, bouncer }: HttpContext) {
    if (await bouncer.with('TodoPolicy').denies('create')) {
      return response.forbidden({
        msg: 'not allowed to access resource',
      })
    }

    const payload = await request.validateUsing(createTodoValidator, {
      meta: {
        user_id: auth.user!.id,
      },
    })

    // const todo = await this.todoService.createTodo(payload)
    const todo = await auth.user!.related('todos').create(payload)

    return response.created(todo)
  }

  async patch({ params, request, response, bouncer }: HttpContext) {
    const payload = await request.validateUsing(toggleIsFinishedTodo)

    const foundTodo = await this.todoService.getTodoById(params.id)

    if (!foundTodo) {
      return response.notFound({ message: 'Todo not found' })
    }

    if (await bouncer.with('TodoPolicy').denies('update', foundTodo)) {
      return response.forbidden({
        msg: 'You are not allowed to modify this resource',
      })
    }

    const todo = await this.todoService.updateTodo(params.id, payload)

    return response.ok(todo)
  }

  async update({ params, request, response, auth, bouncer }: HttpContext) {
    const foundTodo = await this.todoService.getTodoById(params.id)

    if (!foundTodo) {
      return response.notFound()
    }

    if (await bouncer.with('TodoPolicy').denies('update', foundTodo)) {
      return response.forbidden({
        msg: 'You are not allowed to modify this resource',
      })
    }

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
    emitter.emit('todo:list_todo', todos)
    return response.ok(todos)
  }

  async destroy({ params, response, bouncer }: HttpContext) {
    const todo = await this.todoService.getTodoById(params.id)

    if (!todo) {
      return response.notFound()
    }

    if (await bouncer.with('TodoPolicy').denies('delete', todo)) {
      return response.forbidden({
        msg: 'You are not allowed to modify this resource',
      })
    }

    await todo.delete()

    return response.noContent()
  }
}
