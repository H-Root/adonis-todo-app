import Todo from '#models/todo'
import User from '#models/user'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'user:registered': User
    'todo:list_todo': Todo[]
  }
}
