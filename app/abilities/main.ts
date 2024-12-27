/*
|--------------------------------------------------------------------------
| Bouncer abilities
|--------------------------------------------------------------------------
|
| You may export multiple abilities from this file and pre-register them
| when creating the Bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

import Todo from '#models/todo'
import User from '#models/user'
import { Bouncer } from '@adonisjs/bouncer'

export const editTodo = Bouncer.ability((user: User, todo: Todo) => {
  return user.id === todo.userId
})
