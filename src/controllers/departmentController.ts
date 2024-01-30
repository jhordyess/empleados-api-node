import type { Request, Response, NextFunction } from 'express'
import { HttpError } from '@/utils/classes'
import {
  listDepartments as listDepartmentsService,
  departmentById as departmentByIdService,
  employeeByDepartment as employeeByDepartmentService,
  createDepartment as createDepartmentService,
  updateDepartment as updateDepartmentService,
  deleteDepartment as deleteDepartmentService
} from '@/services/departmentService'
import type {
  listDeptReq,
  getDeptReq,
  createDeptReq,
  updateDeptReq
} from '@/v1/routes/department/validations'

export const listDepartments = async (
  req: Request & listDeptReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sort, search } = req.query

    const query = {
      page: page ? page - 1 : 0,
      limit: limit || 10,
      sort: sort || undefined,
      search: search || undefined
    }

    await listDepartmentsService(query, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Error while listing departments', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const getDepartment = async (
  req: Request & getDeptReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deptId } = req.params

    await departmentByIdService(deptId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Error while getting department', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const employeeByDept = async (
  req: Request & getDeptReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deptId } = req.params

    await employeeByDepartmentService(deptId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Employees not found', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const createDepartment = async (
  req: Request & createDeptReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description } = req.body

    await createDepartmentService(name, description, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Department not created', 500, false)

      res.status(201).json({
        message: 'Department created successfully',
        data
      })
    })
  } catch (error) {
    next(error)
  }
}

export const updateDepartment = async (
  req: Request & updateDeptReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deptId } = req.params

    const { name, description } = req.body

    await updateDepartmentService(deptId, name, description, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Department not modified', 500, false)

      res.status(200).json({ message: 'Department modified successfully', data })
    })
  } catch (error) {
    next(error)
  }
}

export const deleteDepartment = async (
  req: Request & getDeptReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { deptId } = req.params

    await deleteDepartmentService(deptId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Department not deleted', 500, false)

      res.status(200).json({
        message: 'Department deleted successfully'
      })
    })
  } catch (error) {
    next(error)
  }
}
