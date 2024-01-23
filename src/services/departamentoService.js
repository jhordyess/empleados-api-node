import { PrismaClient } from '@prisma/client'
import { HttpError } from '../utils/classes.js'

const prisma = new PrismaClient()

export const listarDepartamentos = async (query, callback) => {
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

export const departamentoById = async (id, callback) => {
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

export const empleadosByDepartamento = async (id, callback) => {
  try {
    const departamento = await prisma.departamento.findUnique({
      where: {
        id,
        activo: true
      },
      select: {
        empleados: {
          select: {
            id: true,
            activo: true,
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
        }
      }
    })

    if (!departamento) throw new HttpError('Departamento no encontrado', 404)

    const empleados = departamento.empleados.map(({ persona, ...empleado }) => ({
      ...empleado,
      ...persona
    }))

    callback(null, empleados)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

export const crearDepartamento = async (nombre, descripcion, callback) => {
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

export const modificarDepartamento = async (id, nombre, descripcion, callback) => {
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

export const eliminarDepartamento = async (id, callback) => {
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

export const departamentoActiveExists = async id => {
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
