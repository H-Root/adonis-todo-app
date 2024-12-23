import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UserService {
  /**
   * Create a new user
   */
  public async createUser(data: Partial<User>): Promise<User> {
    const user = await User.create(data)
    return user
  }

  /**
   * Get all users
   */
  public async getAllUsers(): Promise<User[]> {
    return await User.all()
  }

  /**
   * Sign user in
   */
  public async signin(data: { email: string; password: string }) {
    const user = await User.findByOrFail('email', data.email)
    const samePassword = await hash.verify(user.password, data.password)
    if (samePassword) {
      const token = await User.accessTokens.create(user)
      return token
    }
  }
}
