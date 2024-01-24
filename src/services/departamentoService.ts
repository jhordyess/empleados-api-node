import { PrismaClient } from '@prisma/client'
import { HttpError } from '@/utils/classes'

const prisma = new PrismaClient()

type TListarDepartamentos = (
  query: {
    search?: string
    sort?: string
    page: number
    limit: number
  },
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const listarDepartamentos: TListarDepartamentos = async (query, callback) => {
  try {
    const OR = query.search
      ? [
          {
            nombre: {
              contains: query.search
            }
          },
          {
            descripcion: {
              contains: query.search
            }
          }
        ]
      : undefined

    const orderBy = query.sort
      ? {
          [query.sort]: 'asc'
        }
      : undefined

    const departamentos = await prisma.departamento.findMany({
      where: {
        activo: true,
        OR
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true
      },
      skip: query.page * query.limit,
      take: query.limit,
      orderBy
    })

    if (!departamentos) throw new HttpError('Error al listar departamentos', 500)

    callback(null, departamentos)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TDepartamentoById = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const departamentoById: TDepartamentoById = async (id, callback) => {
  try {
    const departamento = await prisma.departamento.findUnique({
      where: {
        id,
        activo: true
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true
      }
    })

    if (!departamento) throw new HttpError('Departamento no encontrado', 404)

    callback(null, departamento)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEmpleadosByDepartamento = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const empleadosByDepartamento: TEmpleadosByDepartamento = async (id, callback) => {
  try {
    const exists = await departamentoActiveExists(id)
    if (!exists) throw new HttpError('Departamento no encontrado', 404)

    const empleados = await prisma.empleado.findMany({
      where: {
        activo: true,
        departamentoId: id
      },
      select: {
        id: true,
        persona: {
          select: {
            nombre: true,
            apellidoPaterno: true,
            apellidoMaterno: true,
            fechaNacimiento: true,
            direccion: true,
            telefono: true
          }
        }
      }
    })

    const empleadosMap = empleados.map(({ persona, ...empleado }) => ({
      ...empleado,
      ...persona
    }))

    callback(null, empleadosMap)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TCrearDepartamento = (
  nombre: string,
  descripcion: string,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const crearDepartamento: TCrearDepartamento = async (nombre, descripcion, callback) => {
  try {
    const departamento = await prisma.departamento.create({
      data: {
        nombre,
        descripcion
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true
      }
    })

    if (!departamento) throw new HttpError('Error al crear departamento', 500)

    callback(null, departamento)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TModificarDepartamento = (
  id: number,
  nombre: string,
  descripcion: string,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const modificarDepartamento: TModificarDepartamento = async (
  id,
  nombre,
  descripcion,
  callback
) => {
  try {
    const exists = await departamentoActiveExists(id)
    if (!exists) throw new HttpError('Departamento no encontrado', 404)

    const departamento = await prisma.departamento.update({
      where: {
        id
      },
      data: {
        nombre,
        descripcion
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true
      }
    })

    if (!departamento) throw new HttpError('Error al modificar departamento', 500)

    callback(null, departamento)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEliminarDepartamento = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const eliminarDepartamento: TEliminarDepartamento = async (id, callback) => {
  try {
    const exists = await departamentoActiveExists(id)
    if (!exists) throw new HttpError('Departamento no encontrado', 404)

    const departamento = await prisma.departamento.update({
      where: {
        id
      },
      data: {
        activo: false
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true
      }
    })

    if (!departamento) throw new HttpError('Error al eliminar departamento', 500)

    callback(null, departamento)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TDepartamentoActiveExists = (id: number) => Promise<boolean>

export const departamentoActiveExists: TDepartamentoActiveExists = async (id: number) => {
  try {
    return !!(await prisma.departamento.findUnique({
      where: {
        id,
        activo: true
      }
    }))
  } catch (error) {
    console.error(error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

//TODO handle inactive departamentos
