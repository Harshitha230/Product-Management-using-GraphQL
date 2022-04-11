import { User } from '../models/users.models'
import bcrypt from 'bcryptjs'

//Register a new user
export const signUpResolver = async (parent: any, args: any) => {
  try {
    //Check if the user already exists
    const user = await User.findOne({ email: args.email })
    if (user) {
      throw new Error('User already exists. Please Login to your account')
    } else {
      //Hash the password before storing it into the database
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(args.password, salt)
      args.password = hash

      //Create a new user
      const newUser = await User.create({ ...args })
      return newUser
    }
  } catch (error) {
    return error
  }
}

//Login an existing user
export const loginResolver = async (parent: any, args: any) => {
  try {
    //Check if the user is registered
    const user: any = await User.findOne({ email: args.email })
    if (!user || user.comparePassword(args.password) === false) {
      throw new Error('Wrong email or password, Please check credentials.')
    }
    //Generate token if user credentials are valid
    return { token: user.jwtGenerateToken(), id: user._id }
  } catch (error) {
    return error
  }
}
