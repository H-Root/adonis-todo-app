import { BaseSchema } from '@adonisjs/lucid/schema'
import { Priority } from '../../constants/priority.js'

export default class extends BaseSchema {
  protected tableName = 'todos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.enum('priority', Object.values(Priority)).defaultTo(Priority.LOW).notNullable()
      table.string('title', 100)
      table.string('body', 200)
      table.boolean('is_finished').defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
