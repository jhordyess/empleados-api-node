import { Router } from 'express'
import {
  listarEmpleados,
  obtenerEmpleado,
  crearEmpleado,
  modificarEmpleado,
  eliminarEmpleado
} from '../../../controllers/empleadoController.js'
import {
  listarEmpleadosCheck,
  obtenerEmpleadoCheck,
  crearEmpleadoCheck,
  modificarEmpleadoCheck
} from './validations.js'
import { withAuthAndValidation } from '../../../middlewares/index.js'

const router = Router()

router.get('/', withAuthAndValidation(listarEmpleadosCheck, listarEmpleados))

router.get('/:empleadoId', withAuthAndValidation(obtenerEmpleadoCheck, obtenerEmpleado))

router.post('/', withAuthAndValidation(crearEmpleadoCheck, crearEmpleado))

router.put('/:empleadoId', withAuthAndValidation(modificarEmpleadoCheck, modificarEmpleado))

router.delete('/:empleadoId', withAuthAndValidation(obtenerEmpleadoCheck, eliminarEmpleado))

export default router
