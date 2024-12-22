/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const todosController = () => import('#controllers/todos_controller')

router.group(() => {
  router.get('/todo', [todosController, 'index'])

  router.post('/todo', [todosController, 'store'])

  router.put('/todo/:id', [todosController, 'update']).where('id', router.matchers.number())

  router.delete('/todo/:id', [todosController, 'destroy']).where('id', router.matchers.number())
})
