import type { Request, Response, NextFunction } from 'express'
import { HttpError } from '@/utils/classes'
import {
  listarEmpleados as listarEmpleadosService,
  empleadoById as empleadoByIdService,
  crearEmpleado as crearEmpleadoService,
  modificarEmpleado as modificarEmpleadoService,
  eliminarEmpleado as eliminarEmpleadoService
} from '@/services/empleadoService'
import type {
  listarEmpleadosReq,
  obtenerEmpleadoReq,
  crearEmpleadoReq,
  modificarEmpleadoReq
} from '@/v1/routes/empleado/validations'

export const listarEmpleados = async (
  req: Request & listarEmpleadosReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit, sort, search, dptoId } = req.query

    const query = {
      page: page ? page - 1 : 0,
      limit: limit || 10,
      sort: sort || undefined,
      search: search || undefined,
      dptoId: dptoId || undefined
    }

    await listarEmpleadosService(query, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Error al listar empleados', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const obtenerEmpleado = async (
  req: Request & obtenerEmpleadoReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { empleadoId } = req.params

    await empleadoByIdService(empleadoId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Empleado no encontrado', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const crearEmpleado = async (
  req: Request & crearEmpleadoReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      direccion,
      telefono,
      dptoId
    } = req.body

    await crearEmpleadoService(
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      direccion,
      telefono,
      dptoId,
      (err, data) => {
        if (err) return next(err)

        if (!data) throw new HttpError('Empleado no creado', 500, false)

        res.status(201).json({
          message: 'Empleado creado correctamente',
          data
        })
      }
    )
  } catch (error) {
    next(error)
  }
}

export const modificarEmpleado = async (
  req: Request & modificarEmpleadoReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { empleadoId } = req.params

    const {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      direccion,
      telefono,
      dptoId
    } = req.body

    await modificarEmpleadoService(
      empleadoId,
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      fechaNacimiento,
      direccion,
      telefono,
      dptoId,
      (err, data) => {
        if (err) return next(err)

        if (!data) throw new HttpError('Empleado no modificado', 500, false)

        res.status(200).json({
          message: 'Empleado modificado correctamente',
          data
        })
      }
    )
  } catch (error) {
    next(error)
  }
}

export const eliminarEmpleado = async (
  req: Request & obtenerEmpleadoReq,
  res: Response,
  next: NextFunction
) => {
  try {
    const { empleadoId } = req.params

    await eliminarEmpleadoService(empleadoId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Empleado no eliminado', 500, false)

      res.status(200).json({
        message: 'Empleado eliminado correctamente'
      })
    })
  } catch (error) {
    next(error)
  }
}
