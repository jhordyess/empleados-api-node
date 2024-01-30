import type { Request, Response, NextFunction } from 'express'
import { HttpError } from '@/utils/classes'
import {
  listEmployees as listEmployeesService,
  employeeById as employeeByIdService,
  createEmployee as createEmployeeService,
  updateEmployee as updateEmployeeService,
  deleteEmployee as deleteEmployeeService
} from '@/services/employeeService'
import type {
  listEmployeeReq,
  getEmployeeReq,
  createEmployeeReq,
  updateEmployeeReq
} from '@/v1/routes/employee/validations'

export const listEmployees = async (
  req: Request & listEmployeeReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sort, search, deptId } = req.query

    const query = {
      page: page ? page - 1 : 0,
      limit: limit || 10,
      sort: sort || undefined,
      search: search || undefined,
      deptId: deptId || undefined
    }

    await listEmployeesService(query, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Error while listing employees', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const getEmployee = async (
  req: Request & getEmployeeReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.params

    await employeeByIdService(employeeId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Employee not found', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const createEmployee = async (
  req: Request & createEmployeeReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, lastName, birthDate, address, phone, deptId } = req.body

    await createEmployeeService(name, lastName, birthDate, address, phone, deptId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Employee not created', 500, false)

      res.status(201).json({
        message: 'Employee created successfully',
        data
      })
    })
  } catch (error) {
    next(error)
  }
}

export const updateEmployee = async (
  req: Request & updateEmployeeReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.params

    const { name, lastName, birthDate, address, phone, deptId } = req.body

    await updateEmployeeService(
      employeeId,
      name,
      lastName,
      birthDate,
      address,
      phone,
      deptId,
      (err, data) => {
        if (err) return next(err)

        if (!data) throw new HttpError('Employee not modified', 500, false)

        res.status(200).json({
          message: 'Employee modified successfully',
          data
        })
      }
    )
  } catch (error) {
    next(error)
  }
}

export const deleteEmployee = async (
  req: Request & getEmployeeReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.params

    await deleteEmployeeService(employeeId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Employee not deleted', 500, false)

      res.status(200).json({
        message: 'Employee deleted successfully'
      })
    })
  } catch (error) {
    next(error)
  }
}
