#? Command history

npm init -y && npm pkg delete scripts.test

npm i express && npm pkg set scripts.start="node src/index.js" && npm pkg set scripts.dev="node --watch src/index.js"
npm i bcrypt cors dotenv morgan express-validator jsonwebtoken

npm i -D prettier && touch .prettierrc.json && npm pkg set scripts.format="prettier --write ."
npm i -D eslint && npm pkg set scripts.lint="eslint . --ext .js" && npx eslint --init

npm i -D prisma && npx prisma init && npm pkg set scripts.build:db="prisma migrate dev"
npm pkg set prisma.seed="node prisma/seed.js"
touch prisma/seed.js

npm i swagger-ui-express

mkdir -p \
  src/controllers \
  src/middlewares \
  src/services \
  src/utils \
  src/v1/routes/departamento \
  src/v1/routes/empleado \
  src/v1/routes/usuario

touch src/index.js
# Creating controllers
touch \
  src/controllers/empleadoController.js \
  src/controllers/departamentoController.js \
  src/controllers/usuarioController.js
# Creating services
touch \
  src/services/empleadoService.js \
  src/services/departamentoService.js \
  src/services/usuarioService.js
# Creating v1 routes
touch \
  src/v1/routes/empleado/router.js \
  src/v1/routes/departamento/router.js \
  src/v1/routes/usuario/router.js
# Creating v1 routes validations
touch \
  src/v1/routes/empleado/validations.js \
  src/v1/routes/departamento/validations.js \
  src/v1/routes/usuario/validations.js
# Creating middlewares
touch \
  src/middlewares/requestValidator.js \
  src/middlewares/auth.js \
  src/middlewares/swagger.js \
  src/middlewares/index.js