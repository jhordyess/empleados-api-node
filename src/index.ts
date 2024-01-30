import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import departmentRouter from '@/v1/routes/department/router'
import employeeRouter from '@/v1/routes/employee/router'
import userRouter from '@/v1/routes/user/router'
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
app.use('/api/v1/departments', departmentRouter)
app.use('/api/v1/employees', employeeRouter)
app.use('/api/v1', userRouter)

// Error handler
app.use(errorHandler)

// Not found handler
app.use('*', notFoundHandler)

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`)
})
