import { PrismaClient } from '@prisma/client'
import { HttpError } from '@/utils/classes'
import { departmentActiveExists } from './departmentService'

const prisma = new PrismaClient()

type TListEmployees = (
  query: {
    search?: string
    sort?: string
    page: number
    limit: number
    deptId?: number
  },
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const listEmployees: TListEmployees = async (query, callback) => {
  try {
    if (query.deptId) {
      const deptExists = await departmentActiveExists(query.deptId)
      if (!deptExists) throw new HttpError('Department not found', 404)
    }

    const departmentId = query.deptId ? query.deptId : undefined

    const employees = await prisma.employee.findMany({
      where: {
        active: true,
        department: {
          active: true
        },
        OR: query.search
          ? [
              {
                person: {
                  name: {
                    contains: query.search
                  }
                }
              },
              {
                person: {
                  lastName: {
                    contains: query.search
                  }
                }
              },
              {
                person: {
                  address: {
                    contains: query.search
                  }
                }
              },
              {
                person: {
                  phone: {
                    contains: query.search
                  }
                }
              }
            ]
          : undefined,
        departmentId
      },
      select: {
        id: true,
        person: {
          select: {
            name: true,
            lastName: true,
            birthDate: true,
            address: true,
            phone: true
          }
        },
        department: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      },
      skip: query.page * query.limit,
      take: query.limit,
      orderBy:
        query.sort === 'deptName'
          ? {
              department: {
                name: 'asc'
              }
            }
          : query.sort
            ? {
                person: {
                  [query.sort]: 'asc'
                }
              }
            : undefined
    })

    if (!employees) throw new HttpError('Error while listing employees', 500)

    const employeesMapped = employees.map(({ person, ...employee }) => ({
      ...employee,
      ...person
    }))

    callback(null, employeesMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEmployeeById = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const employeeById: TEmployeeById = async (id, callback) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
        active: true,
        department: {
          active: true
        }
      },
      select: {
        id: true,
        person: {
          select: {
            name: true,
            lastName: true,
            birthDate: true,
            address: true,
            phone: true
          }
        },
        department: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    if (!employee) throw new HttpError('Employee not found', 404)

    const employeeMapped = {
      id: employee.id,
      department: employee.department,
      ...employee.person
    }

    callback(null, employeeMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TCreateEmployee = (
  name: string,
  lastName: string,
  birthDate: Date,
  address: string | undefined,
  phone: string | undefined,
  deptId: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const createEmployee: TCreateEmployee = async (
  name,
  lastName,
  birthDate,
  address,
  phone,
  deptId,
  callback
) => {
  try {
    const deptExists = await departmentActiveExists(deptId)

    if (!deptExists) throw new HttpError('Department not found', 404)

    const employee = await prisma.employee.create({
      data: {
        person: {
          create: {
            name,
            lastName,
            birthDate,
            address,
            phone
          }
        },
        department: {
          connect: {
            id: deptId
          }
        }
      },
      select: {
        id: true,
        person: {
          select: {
            name: true,
            lastName: true,
            birthDate: true,
            address: true,
            phone: true
          }
        },
        department: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    if (!employee) throw new HttpError('Error while creating employee', 500)

    const employeeMapped = {
      id: employee.id,
      department: employee.department,
      ...employee.person
    }

    callback(null, employeeMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TUpdateEmployee = (
  id: number,
  name: string,
  lastName: string,
  birthDate: Date,
  address: string | undefined,
  phone: string | undefined,
  departmentId: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const updateEmployee: TUpdateEmployee = async (
  id,
  name,
  lastName,
  birthDate,
  address,
  phone,
  departmentId,
  callback
) => {
  try {
    const deptExists = await departmentActiveExists(departmentId)

    if (!deptExists) throw new HttpError('Department not found', 404)

    const exists = await employeeActiveExists(id)

    if (!exists) throw new HttpError('Employee not found', 404)

    const employee = await prisma.employee.update({
      where: {
        id
      },
      data: {
        person: {
          update: {
            name,
            lastName,
            birthDate,
            address,
            phone
          }
        },
        department: {
          connect: {
            id: departmentId
          }
        }
      },
      select: {
        id: true,
        person: {
          select: {
            name: true,
            lastName: true,
            birthDate: true,
            address: true,
            phone: true
          }
        },
        department: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }
    })

    if (!employee) throw new HttpError('Error while updating employee', 500)

    const employeeMapped = {
      id: employee.id,
      department: employee.department,
      ...employee.person
    }

    callback(null, employeeMapped)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TDeleteEmployee = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const deleteEmployee: TDeleteEmployee = async (id, callback) => {
  try {
    const exists = await employeeActiveExists(id)

    if (!exists) throw new HttpError('Employee not found', 404)

    const employee = await prisma.employee.update({
      where: {
        id
      },
      data: {
        active: false
      },
      select: {
        id: true
      }
    })

    if (!employee) throw new HttpError('Error while deleting employee', 500)

    callback(null, employee)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEmployeeActiveExists = (id: number) => Promise<boolean>

export const employeeActiveExists: TEmployeeActiveExists = async id => {
  try {
    return !!(await prisma.employee.findUnique({
      where: {
        id,
        active: true
      }
    }))
  } catch (error) {
    console.error(error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

//TODO handle inactive employees
