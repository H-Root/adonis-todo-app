import Todo from '#models/todo'

export default class TodoService {
  /**
   * Fetch all todos
   */
  public async getAllTodos(): Promise<Todo[]> {
    return await Todo.query().orderBy('createdAt', 'desc')
  }

  // /**
  //  * Get a single todo by ID
  //  */
  // public async getTodoById(id: number): Promise<Todo | null> {
  //   return await Todo.find(id)
  // }

  /**
   * Create a new todo
   */
  public async createTodo(data: Partial<Todo>): Promise<Todo> {
    const todo = await Todo.create(data)
    return todo
  }

  /**
   * Update a todo by ID
   */
  public async updateTodo(id: number, data: Partial<Todo>): Promise<Todo | null> {
    const todo = await Todo.find(id)
    if (!todo) return null

    todo.merge(data)
    await todo.save()
    return todo
  }

  /**
   * Delete a todo by ID
   */
  public async deleteTodo(id: number): Promise<boolean> {
    const todo = await Todo.find(id)
    if (!todo) return false

    await todo.delete()
    return true
  }
}
