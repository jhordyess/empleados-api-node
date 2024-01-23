import { HttpError } from '../utils/classes.js'
import {
  listarDepartamentos as listarDepartamentosService,
  departamentoById as departamentoByIdService,
  empleadosByDepartamento as empleadosByDptoService,
  crearDepartamento as crearDepartamentoService,
  modificarDepartamento as modificarDepartamentoService,
  eliminarDepartamento as eliminarDepartamentoService
} from '../services/departamentoService.js'

export const listarDepartamentos = async (req, res, next) => {
  try {
    let { page, limit, sort, search } = req.query

    const query = {
      page: page ? page - 1 : 0,
      limit: limit || 10,
      sort: sort || undefined,
      search: search || undefined
    }

    await listarDepartamentosService(query, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Error al listar departamentos', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const obtenerDepartamento = async (req, res, next) => {
  try {
    const { dptoId } = req.params

    await departamentoByIdService(dptoId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Departamento no encontrado', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const empleadosByDpto = async (req, res, next) => {
  try {
    const { dptoId } = req.params

    await empleadosByDptoService(dptoId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Empleados no encontrados', 500, false)

      res.status(200).json({ data })
    })
  } catch (error) {
    next(error)
  }
}

export const crearDepartamento = async (req, res, next) => {
  try {
    const { nombre, descripcion } = req.body

    await crearDepartamentoService(nombre, descripcion, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Departamento no creado', 500, false)

      res.status(200).json({
        message: 'Departamento creado correctamente',
        data
      })
    })
  } catch (error) {
    next(error)
  }
}

export const modificarDepartamento = async (req, res, next) => {
  try {
    const { dptoId } = req.params

    const { nombre, descripcion } = req.body

    await modificarDepartamentoService(dptoId, nombre, descripcion, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Departamento no modificado', 500, false)

      res.status(200).json({ message: 'Departamento modificado correctamente', data })
    })
  } catch (error) {
    next(error)
  }
}

export const eliminarDepartamento = async (req, res, next) => {
  try {
    const { dptoId } = req.params

    await eliminarDepartamentoService(dptoId, (err, data) => {
      if (err) return next(err)

      if (!data) throw new HttpError('Departamento no eliminado', 500, false)

      res.status(200).json({
        message: 'Departamento eliminado correctamente'
      })
    })
  } catch (error) {
    next(error)
  }
}
