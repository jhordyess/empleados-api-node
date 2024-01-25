import type { RequestHandler } from 'express'
import swaggerUi from 'swagger-ui-express'
import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'

const getFile: () => object = () => {
  try {
    const openApiFilePath: string = resolve('docs', 'openapi.json')
    const openApiFileContent: string = readFileSync(openApiFilePath, { encoding: 'utf8' })
    const openApiJSON = JSON.parse(openApiFileContent)
    openApiJSON.servers = [{ url: 'http://localhost:3000/api/v1', description: 'Local server' }]
    return openApiJSON
  } catch (error) {
    console.log('error', error)
    return {}
  }
}

export const withSwagger = [
  swaggerUi.serve,
  swaggerUi.setup(getFile(), {
    customCssUrl:
      'https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.1/themes/3.x/theme-outline.min.css'
  })
]

export const swaggerFile: RequestHandler = (_, res) => {
  res.json(getFile())
}
