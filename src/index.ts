import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import departamentoRouter from '@/v1/routes/departamento/router'
import empleadoRouter from '@/v1/routes/empleado/router'
import usuarioRouter from '@/v1/routes/usuario/router'
import { healthCheckHandler, errorHandler, notFoundHandler } from '@/middlewares/handlers'
import { swaggerFile, withSwagger } from '@/middlewares/swagger'

const PORT = process.env.BACKEND_PORT || 3000
const app = express()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// Health check
app.get('/', healthCheckHandler)

// Swagger
app.use('/api/v1/docs', ...withSwagger)
app.get('/api/v1/docs.json', swaggerFile)

// Routes
app.use('/api/v1/departamentos', departamentoRouter)
app.use('/api/v1/empleados', empleadoRouter)
app.use('/api/v1', usuarioRouter)

// Error handler
app.use(errorHandler)

// Not found handler
app.use('*', notFoundHandler)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
})
