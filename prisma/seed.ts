import { createDepartment } from '@/services/departmentService'
import { createUser } from '@/services/userService'
import { createEmployee } from '@/services/employeeService'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const addAdmin = async () => {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD)
      throw new Error('There is no ADMIN_EMAIL or ADMIN_PASSWORD defined')

    await createUser('Admin', ADMIN_EMAIL, ADMIN_PASSWORD, err => {
      if (err) throw err
      console.info('Admin user created successfully')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const addDepartments = async () => {
  try {
    const departments = [
      {
        name: 'Development',
        description: 'Department of Development'
      },
      {
        name: 'Human Resources',
        description: 'Department of Human Resources'
      },
      {
        name: 'Sales',
        description: 'Department of Sales'
      },
      {
        name: 'Marketing',
        description: 'Department of Marketing'
      }
    ]

    for (const dept of departments) {
      await createDepartment(dept.name, dept.description, err => {
        if (err) throw err
        console.info(`Department ${dept.name} created successfully`)
      })
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const addEmployees = async () => {
  try {
    const employees = [
      {
        name: 'Jhon',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01'),
        address: 'Nulla Street, 123',
        phone: '1234567890',
        deptId: 1
      },
      {
        name: 'Mary',
        lastName: 'Smith',
        birthDate: new Date('1990-01-01'),
        address: 'Martin Street, 123',
        phone: '1234567890',
        deptId: 2
      },
      {
        name: 'George',
        lastName: 'Hernandez',
        birthDate: new Date('1990-01-01'),
        address: 'Patterson Street, 456',
        phone: '1234567890',
        deptId: 3
      },
      {
        name: 'Peter',
        lastName: 'Parker',
        birthDate: new Date('1990-01-01'),
        address: 'Parker Street, 789',
        phone: '1234567890',
        deptId: 4
      }
    ]

    for (const employee of employees) {
      await createEmployee(
        employee.name,
        employee.lastName,
        employee.birthDate,
        employee.address,
        employee.phone,
        employee.deptId,
        err => {
          if (err) throw err
          console.info(`Employee ${employee.name} created successfully`)
        }
      )
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

addAdmin()
addDepartments().then(() => addEmployees())
