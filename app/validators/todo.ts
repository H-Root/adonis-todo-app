import vine from '@vinejs/vine'
import { Priority } from '../../constants/priority.js'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .unique({ table: 'todos', column: 'title' }),
    body: vine.string().trim().minLength(3).maxLength(200),
    priority: vine.enum(Object.values(Priority)),
  })
)

export const updateTodoValidator = vine.withMetaData<{ id: number }>().compile(
  vine.object({
    title: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .unique(async (db, value, field) => {
        const user = await db
          .from('todos')
          .whereNot('id', field.meta.id)
          .where('title', value)
          .first()
        return !user
      }),
    body: vine.string().trim().minLength(3).maxLength(200),
    priority: vine.enum(Object.values(Priority)),
    isFinished: vine.boolean(),
  })
)
