import { Router } from 'express'
import {
  listarEmpleados,
  obtenerEmpleado,
  crearEmpleado,
  modificarEmpleado,
  eliminarEmpleado
} from '@/controllers/empleadoController'
import {
  listarEmpleadosCheck,
  obtenerEmpleadoCheck,
  crearEmpleadoCheck,
  modificarEmpleadoCheck
} from './validations'
import { withAuthAndValidation } from '@/middlewares'

const router = Router()

router.get('/', ...withAuthAndValidation(listarEmpleadosCheck, listarEmpleados))

router.get('/:empleadoId', ...withAuthAndValidation(obtenerEmpleadoCheck, obtenerEmpleado))

router.post('/', ...withAuthAndValidation(crearEmpleadoCheck, crearEmpleado))

router.put('/:empleadoId', ...withAuthAndValidation(modificarEmpleadoCheck, modificarEmpleado))

router.delete('/:empleadoId', ...withAuthAndValidation(obtenerEmpleadoCheck, eliminarEmpleado))

export default router
