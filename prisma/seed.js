import { crearDepartamento } from '../src/services/departamentoService.js'
import { createUser } from '../src/services/usuarioService.js'
import { crearEmpleado } from '../src/services/empleadoService.js'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const addAdmin = async () => {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD)
      throw new Error('No se encontraron las variables de entorno ADMIN_EMAIL y ADMIN_PASSWORD')

    await createUser('Admin', ADMIN_EMAIL, ADMIN_PASSWORD, err => {
      if (err) throw err
      console.info('Usuario administrador creado exitosamente')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const addDepartamentos = async () => {
  try {
    const departamentos = [
      {
        nombre: 'Desarrollo',
        descripcion: 'Departamento de desarrollo'
      },
      {
        nombre: 'Recursos Humanos',
        descripcion: 'Departamento de recursos humanos'
      },
      {
        nombre: 'Ventas',
        descripcion: 'Departamento de ventas'
      },
      {
        nombre: 'Marketing',
        descripcion: 'Departamento de marketing'
      }
    ]

    for (const dpto of departamentos) {
      await crearDepartamento(dpto.nombre, dpto.descripcion, err => {
        if (err) throw err
        console.info(`Departamento ${dpto.nombre} creado exitosamente`)
      })
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const addEmpleados = async () => {
  try {
    const empleados = [
      {
        nombre: 'Juan',
        apellidoPaterno: 'Perez',
        apellidoMaterno: 'Lopez',
        fechaNacimiento: new Date('1990-01-01'),
        direccion: 'Calle 1 #123',
        telefono: '1234567890',
        dptoId: 1
      },
      {
        nombre: 'Maria',
        apellidoPaterno: 'Gonzalez',
        apellidoMaterno: 'Gomez',
        fechaNacimiento: new Date('1990-01-01'),
        direccion: 'Calle 2 #123',
        telefono: '1234567890',
        dptoId: 2
      },
      {
        nombre: 'Pedro',
        apellidoPaterno: 'Rodriguez',
        apellidoMaterno: 'Hernandez',
        fechaNacimiento: new Date('1990-01-01'),
        direccion: 'Calle 3 #123',
        telefono: '1234567890',
        dptoId: 3
      },
      {
        nombre: 'Ana',
        apellidoPaterno: 'Martinez',
        apellidoMaterno: 'Perez',
        fechaNacimiento: new Date('1990-01-01'),
        direccion: 'Calle 4 #123',
        telefono: '1234567890',
        dptoId: 4
      }
    ]

    for (const empleado of empleados) {
      await crearEmpleado(
        empleado.nombre,
        empleado.apellidoPaterno,
        empleado.apellidoMaterno,
        empleado.fechaNacimiento,
        empleado.direccion,
        empleado.telefono,
        empleado.dptoId,
        err => {
          if (err) throw err
          console.info(`Empleado ${empleado.nombre} creado exitosamente`)
        }
      )
    }
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

addAdmin()
addDepartamentos()
addEmpleados()
