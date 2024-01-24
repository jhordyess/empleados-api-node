import { PrismaClient } from '@prisma/client'
import { HttpError } from '@/utils/classes'
import { departamentoActiveExists } from './departamentoService'

const prisma = new PrismaClient()

type TListarEmpleados = (
  query: {
    search?: string
    sort?: string
    page: number
    limit: number
    dptoId?: number
  },
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const listarEmpleados: TListarEmpleados = async (query, callback) => {
  try {
    if (query.dptoId) {
      const dptoExists = await departamentoActiveExists(query.dptoId)
      if (!dptoExists) throw new HttpError('Departamento no encontrado', 404)
    }

    const departamentoId = query.dptoId ? query.dptoId : undefined

    const empleados = await prisma.empleado.findMany({
      where: {
        activo: true,
        departamento: {
          activo: true
        },
        OR: query.search
          ? [
              {
                persona: {
                  nombre: {
                    contains: query.search
                  }
                }
              },
              {
                persona: {
                  apellidoPaterno: {
                    contains: query.search
                  }
                }
              },
              {
                persona: {
                  apellidoMaterno: {
                    contains: query.search
                  }
                }
              },
              {
                persona: {
                  direccion: {
                    contains: query.search
                  }
                }
              },
              {
                persona: {
                  telefono: {
                    contains: query.search
                  }
                }
              }
            ]
          : undefined,
        departamentoId
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
        },
        departamento: {
          select: {
            id: true,
            nombre: true,
            descripcion: true
          }
        }
      },
      skip: query.page * query.limit,
      take: query.limit,
      orderBy:
        query.sort === 'nombreDpto'
          ? {
              departamento: {
                nombre: 'asc'
              }
            }
          : query.sort
            ? {
                persona: {
                  [query.sort]: 'asc'
                }
              }
            : undefined
    })

    if (!empleados) throw new HttpError('Error al listar empleados', 500)

    const empleadosMapped = empleados.map(({ persona, ...empleado }) => ({
      ...empleado,
      ...persona
    }))

    callback(null, empleadosMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEmpleadoById = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const empleadoById: TEmpleadoById = async (id, callback) => {
  try {
    const empleado = await prisma.empleado.findUnique({
      where: {
        id,
        activo: true,
        departamento: {
          activo: true
        }
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
        },
        departamento: {
          select: {
            id: true,
            nombre: true,
            descripcion: true
          }
        }
      }
    })

    if (!empleado) throw new HttpError('Empleado no encontrado', 404)

    const empleadoMapped = {
      id: empleado.id,
      departamento: empleado.departamento,
      ...empleado.persona
    }

    callback(null, empleadoMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TCrearEmpleado = (
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  fechaNacimiento: Date,
  direccion: string | undefined,
  telefono: string | undefined,
  dptoId: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const crearEmpleado: TCrearEmpleado = async (
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  fechaNacimiento,
  direccion,
  telefono,
  dptoId,
  callback
) => {
  try {
    const dptoExists = await departamentoActiveExists(dptoId)

    if (!dptoExists) throw new HttpError('Departamento no encontrado', 404)

    const empleado = await prisma.empleado.create({
      data: {
        persona: {
          create: {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            direccion,
            telefono
          }
        },
        departamento: {
          connect: {
            id: dptoId
          }
        }
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
        },
        departamento: {
          select: {
            id: true,
            nombre: true,
            descripcion: true
          }
        }
      }
    })

    if (!empleado) throw new HttpError('Error al crear empleado', 500)

    const empleadoMapped = {
      id: empleado.id,
      departamento: empleado.departamento,
      ...empleado.persona
    }

    callback(null, empleadoMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TModificarEmpleado = (
  id: number,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  fechaNacimiento: Date,
  direccion: string | undefined,
  telefono: string | undefined,
  departamentoId: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const modificarEmpleado: TModificarEmpleado = async (
  id,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  fechaNacimiento,
  direccion,
  telefono,
  departamentoId,
  callback
) => {
  try {
    const dptoExists = await departamentoActiveExists(departamentoId)

    if (!dptoExists) throw new HttpError('Departamento no encontrado', 404)

    const exists = await empleadoActiveExists(id)

    if (!exists) throw new HttpError('Empleado no encontrado', 404)

    const empleado = await prisma.empleado.update({
      where: {
        id
      },
      data: {
        persona: {
          update: {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            fechaNacimiento,
            direccion,
            telefono
          }
        },
        departamento: {
          connect: {
            id: departamentoId
          }
        }
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
        },
        departamento: {
          select: {
            id: true,
            nombre: true,
            descripcion: true
          }
        }
      }
    })

    if (!empleado) throw new HttpError('Error al modificar empleado', 500)

    const empleadoMapped = {
      id: empleado.id,
      departamento: empleado.departamento,
      ...empleado.persona
    }

    callback(null, empleadoMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEliminarEmpleado = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const eliminarEmpleado: TEliminarEmpleado = async (id, callback) => {
  try {
    const exists = await empleadoActiveExists(id)

    if (!exists) throw new HttpError('Empleado no encontrado', 404)

    const empleado = await prisma.empleado.update({
      where: {
        id
      },
      data: {
        activo: false
      },
      select: {
        id: true
      }
    })

    if (!empleado) throw new HttpError('Error al eliminar empleado', 500)

    callback(null, empleado)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEmpleadoActiveExists = (id: number) => Promise<boolean>

export const empleadoActiveExists: TEmpleadoActiveExists = async id => {
  try {
    return !!(await prisma.empleado.findUnique({
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

//TODO handle inactive empleados
