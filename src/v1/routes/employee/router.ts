import { Router } from 'express'
import {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '@/controllers/employeeController'
import {
  listEmployeeCheck,
  getEmployeeCheck,
  createEmployeeCheck,
  updateEmployeeCheck
} from './validations'
import { withAuthAndValidation } from '@/middlewares'

const router = Router()

router.get('/', ...withAuthAndValidation(listEmployeeCheck, listEmployees))

router.get('/:employeeId', ...withAuthAndValidation(getEmployeeCheck, getEmployee))

router.post('/', ...withAuthAndValidation(createEmployeeCheck, createEmployee))

router.put('/:employeeId', ...withAuthAndValidation(updateEmployeeCheck, updateEmployee))

router.delete('/:employeeId', ...withAuthAndValidation(getEmployeeCheck, deleteEmployee))

export default router
