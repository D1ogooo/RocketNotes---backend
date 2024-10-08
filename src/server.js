require('express-async-errors')
const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const express = require('express')
const routes = require('./routes')
const uploadConfig = require('./configs/upload')
const cors = require('cors')

migrationsRun();

app.use(cors());
const app = express();
app.use(express.json());

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes);

app.use((error, req, res, next) => {
 if (error instanceof AppError) {
  return res.status(error.statusCode).json({
   status: "error",
   message: error.message
  });
 }

  return res.status(500).json({
   status: 'error',
   message: "Internal server errror",
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))