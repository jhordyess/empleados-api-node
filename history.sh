#? Command history

yarn init -y && npm pkg delete scripts.test

yarn add express && npm pkg set scripts.start="node dist/index.cjs" && npm pkg set scripts.dev="webpack --mode development --watch" && npm pkg set scripts.build="webpack --mode production"
yarn add bcrypt cors morgan express-validator jsonwebtoken swagger-ui-express
yarn add -D typescript ts-loader @types/node @types/express @types/bcrypt @types/cors @types/morgan @types/jsonwebtoken @types/swagger-ui-express
yarn add -D webpack webpack-cli webpack-node-externals nodemon-webpack-plugin dotenv-webpack

yarn add -D prettier && touch .prettierrc.json && npm pkg set scripts.format="prettier --write ."
yarn add -D eslint && npm pkg set scripts.lint="eslint . --ext .ts" && yarn eslint --init

yarn add -D prisma && yarn prisma init && npm pkg set scripts.build:db="prisma migrate dev"
# An error was given when using ts-node, will fail with ERR_MODULE_NOT_FOUND
# Review https://github.com/TypeStrong/ts-node/issues/1997
# One solution is compiling ts to js and then run the seed
npm pkg set prisma.seed="node dist/seed.cjs"
touch prisma/seed.ts

mkdir -p \
  src/controllers \
  src/middlewares \
  src/services \
  src/utils \
  src/v1/routes/departamento \
  src/v1/routes/empleado \
  src/v1/routes/usuario

touch src/index.ts
# Creating controllers
touch \
  src/controllers/empleadoController.ts \
  src/controllers/departamentoController.ts \
  src/controllers/usuarioController.ts
# Creating services
touch \
  src/services/empleadoService.ts \
  src/services/departamentoService.ts \
  src/services/usuarioService.ts
# Creating v1 routes
touch \
  src/v1/routes/empleado/router.ts \
  src/v1/routes/departamento/router.ts \
  src/v1/routes/usuario/router.ts
# Creating v1 routes validations
touch \
  src/v1/routes/empleado/validations.ts \
  src/v1/routes/departamento/validations.ts \
  src/v1/routes/usuario/validations.ts
# Creating middlewares
touch \
  src/middlewares/requestValidator.ts \
  src/middlewares/auth.ts \
  src/middlewares/swagger.ts \
  src/middlewares/index.ts
