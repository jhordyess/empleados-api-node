import { PrismaClient } from '@prisma/client'
import { HttpError } from '@/utils/classes'

const prisma = new PrismaClient()

type TListDepartments = (
  query: {
    search?: string
    sort?: string
    page: number
    limit: number
  },
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const listDepartments: TListDepartments = async (query, callback) => {
  try {
    const OR = query.search
      ? [
          {
            name: {
              contains: query.search
            }
          },
          {
            description: {
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

    const departments = await prisma.department.findMany({
      where: {
        active: true,
        OR
      },
      select: {
        id: true,
        name: true,
        description: true
      },
      skip: query.page * query.limit,
      take: query.limit,
      orderBy
    })

    if (!departments) throw new HttpError('Error while listing departments', 500)

    callback(null, departments)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TDepartmentById = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const departmentById: TDepartmentById = async (id, callback) => {
  try {
    const department = await prisma.department.findUnique({
      where: {
        id,
        active: true
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })

    if (!department) throw new HttpError('Department not found', 404)

    callback(null, department)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TEmployeeByDepartment = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const employeeByDepartment: TEmployeeByDepartment = async (id, callback) => {
  try {
    const exists = await departmentActiveExists(id)
    if (!exists) throw new HttpError('Department not found', 404)

    const employees = await prisma.employee.findMany({
      where: {
        active: true,
        departmentId: id
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
        }
      }
    })

    const employeesMap = employees.map(({ person, ...employee }) => ({
      ...employee,
      ...person
    }))

    callback(null, employeesMap)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TCreateDepartment = (
  name: string,
  description: string,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const createDepartment: TCreateDepartment = async (name, description, callback) => {
  try {
    const department = await prisma.department.create({
      data: {
        name,
        description
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })

    if (!department) throw new HttpError('Error while creating department', 500)

    callback(null, department)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TUpdateDepartment = (
  id: number,
  name: string,
  description: string,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const updateDepartment: TUpdateDepartment = async (id, name, description, callback) => {
  try {
    const exists = await departmentActiveExists(id)
    if (!exists) throw new HttpError('Department not found', 404)

    const department = await prisma.department.update({
      where: {
        id
      },
      data: {
        name,
        description
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })

    if (!department) throw new HttpError('Error while updating department', 500)

    callback(null, department)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TDeleteDepartment = (
  id: number,
  callback: (error: Error | unknown, data?: object) => void
) => Promise<void>

export const deleteDepartment: TDeleteDepartment = async (id, callback) => {
  try {
    const exists = await departmentActiveExists(id)
    if (!exists) throw new HttpError('Department not found', 404)

    const department = await prisma.department.update({
      where: {
        id
      },
      data: {
        active: false
      },
      select: {
        id: true,
        name: true,
        description: true
      }
    })

    if (!department) throw new HttpError('Error while deleting department', 500)

    callback(null, department)
  } catch (error) {
    callback(error)
  } finally {
    await prisma.$disconnect()
  }
}

type TDepartmentActiveExists = (id: number) => Promise<boolean>

export const departmentActiveExists: TDepartmentActiveExists = async (id: number) => {
  try {
    return !!(await prisma.department.findUnique({
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

//TODO handle inactive departments
