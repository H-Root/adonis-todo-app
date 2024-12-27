/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const todosController = () => import('#controllers/todos_controller')
const usersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('/', [todosController, 'index'])

    router.post('/', [todosController, 'store'])

    router.put('/:id', [todosController, 'update']).where('id', router.matchers.number())

    router.patch('/:id', [todosController, 'patch']).where('id', router.matchers.number())

    router.delete('/:id', [todosController, 'destroy']).where('id', router.matchers.number())
  })
  .prefix('/todo')
  .use(middleware.auth({ guards: ['api'] }))

router
  .group(() => {
    router.post('/', [usersController, 'store'])
    router.post('/auth', [usersController, 'validate'])
    router.get('/', [usersController, 'index'])
  })
  .prefix('/user')
