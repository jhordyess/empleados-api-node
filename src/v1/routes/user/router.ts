import { Router } from 'express'
import { withValidation } from '@/middlewares'
import { loginCheck, registerCheck } from './validations'
import { login, register } from '@/controllers/userController'

const router = Router()

router.post('/login', ...withValidation(loginCheck, login))

router.post('/register', ...withValidation(registerCheck, register))

export default router
