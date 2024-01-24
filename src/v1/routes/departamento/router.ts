import { Router } from 'express'
import {
  listarDepartamentos,
  obtenerDepartamento,
  empleadosByDpto,
  crearDepartamento,
  modificarDepartamento,
  eliminarDepartamento
} from '@/controllers/departamentoController'
import {
  listarDptoCheck,
  obtenerDptoCheck,
  crearDptoCheck,
  modificarDptoCheck
} from './validations'

import { withAuthAndValidation } from '@/middlewares'

const router = Router()

router.get('/', ...withAuthAndValidation(listarDptoCheck, listarDepartamentos))

router.get('/:dptoId', ...withAuthAndValidation(obtenerDptoCheck, obtenerDepartamento))

router.get('/:dptoId/empleados', ...withAuthAndValidation(obtenerDptoCheck, empleadosByDpto))

router.post('/', ...withAuthAndValidation(crearDptoCheck, crearDepartamento))

router.put('/:dptoId', ...withAuthAndValidation(modificarDptoCheck, modificarDepartamento))

router.delete('/:dptoId', ...withAuthAndValidation(obtenerDptoCheck, eliminarDepartamento))

export default router
