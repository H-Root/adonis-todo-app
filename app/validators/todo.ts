import vine from '@vinejs/vine'
import { Priority } from '../constants/priority.js'

export const createTodoValidator = vine.withMetaData<{ user_id: number }>().compile(
  vine.object({
    title: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .unique(async (db, value, field) => {
        const unique = await db
          .from('todos')
          .where('user_id', field.meta.user_id)
          .where('title', value)
          .first()
        return !unique
      }),
    body: vine.string().trim().minLength(3).maxLength(200),
    priority: vine.enum(Object.values(Priority)),
  })
)

export const updateTodoValidator = vine.withMetaData<{ id: number; user_id: number }>().compile(
  vine.object({
    title: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(100)
      .unique(async (db, value, field) => {
        const unique = await db
          .from('todos')
          .where('user_id', field.meta.user_id)
          .whereNot('id', field.meta.id)
          .where('title', value)
          .first()
        return !unique
      }),
    body: vine.string().trim().minLength(3).maxLength(200),
    priority: vine.enum(Object.values(Priority)),
  })
)

export const toggleIsFinishedTodo = vine.compile(
  vine.object({
    isFinished: vine.boolean(),
  })
)
