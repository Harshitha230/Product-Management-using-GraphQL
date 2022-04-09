import { User } from '../models/users.models'
import bcrypt from 'bcryptjs'

export const signUpResolver = async(parent: any, args: any) => {
    try{
        const user = await User.findOne({email: args.email})
        if(user){
            throw new Error('User already exists. Please Login to your account')
        }
        else{
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(args.password, salt)
            args.password = hash

            const newUser = await User.create({...args})
            return newUser
        }
    }
    catch(error){
        return error
    }
}

export const loginResolver = async(parent: any, args: any) => {
    try{
        const user:any = await User.findOne({email: args.email})
        if(!user || user.comparePassword(args.password)===false){
            throw new Error('Wrong email or password, Please check credentials.')
        }
        return { token: user.jwtGenerateToken(), id: user._id}
    }
    catch(error){
        return error
    }
}