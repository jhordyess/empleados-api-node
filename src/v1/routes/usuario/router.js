import { Router } from 'express'
import { withValidation } from '../../../middlewares/index.js'
import { loginCheck, registerCheck } from './validations.js'
import { login, register } from '../../../controllers/usuarioController.js'

const router = Router()

router.post('/login', withValidation(loginCheck, login))

router.post('/register', withValidation(registerCheck, register))

export default router
