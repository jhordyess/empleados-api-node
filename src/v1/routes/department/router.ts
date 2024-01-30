import { Router } from 'express'
import {
  listDepartments,
  getDepartment,
  employeeByDept,
  createDepartment,
  updateDepartment,
  deleteDepartment
} from '@/controllers/departmentController'
import { listDeptCheck, getDeptCheck, createDeptCheck, updateDeptCheck } from './validations'

import { withAuthAndValidation } from '@/middlewares'

const router = Router()

router.get('/', ...withAuthAndValidation(listDeptCheck, listDepartments))

router.get('/:deptId', ...withAuthAndValidation(getDeptCheck, getDepartment))

router.get('/:deptId/employees', ...withAuthAndValidation(getDeptCheck, employeeByDept))

router.post('/', ...withAuthAndValidation(createDeptCheck, createDepartment))

router.put('/:deptId', ...withAuthAndValidation(updateDeptCheck, updateDepartment))

router.delete('/:deptId', ...withAuthAndValidation(getDeptCheck, deleteDepartment))

export default router
