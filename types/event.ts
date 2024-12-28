import Todo from '#models/todo'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'todo:list_todo': Todo[]
  }
}
