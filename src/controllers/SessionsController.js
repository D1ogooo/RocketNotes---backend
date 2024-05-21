const knex = require("../database/knex");
const AppError = require('../utils/AppError')

class SessionsController {
  async create(req,res) {
   const { email, password } = req.body
   
   const user = await knex("users").where({ email }).first();

   return res.json(email, password)
  }
}

module.exports = SessionsController