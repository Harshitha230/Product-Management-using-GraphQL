import { model, Schema, Model, Document } from 'mongoose'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const TOKEN_KEY = process.env.TOKEN_KEY as string

export interface User extends Document {
  name: { type: string; default: null }
  email: { type: string; unique: true }
  password: { type: string }
  token: { type: string }
}

const Userschema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
})

Userschema.methods.comparePassword = function (userpwd: string) {
  const res = bcrypt.compareSync(userpwd, this.password)
  if (res === false) {
    console.log('Passwords dont match')
    return false
  } else {
    console.log('Passwords match')
    return true
  }
}

Userschema.methods.jwtGenerateToken = function (
  data: any,
  req: Request,
  res: Response
) {
  return jwt.sign({ email: this.email }, TOKEN_KEY, { expiresIn: 3600 })
}

export const User: Model<User> = model('User', Userschema)
