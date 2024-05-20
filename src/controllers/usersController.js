const { hash } = require('bcryptjs');
const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");

class usersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    try {
      console.log('Tentando conectar ao banco de dados...');
      const database = await sqliteConnection();
      console.log('Conexão estabelecida.');

      const checkUserExists = await database.get(`SELECT * FROM users WHERE email = ?`, [email]);

      if (checkUserExists) {
        console.error('Este email já está em uso.');
        throw new AppError("Este email já está em uso.");
      }

      const hashedPassword = await hash(password, 8);
      console.log('Senha criptografada.');

      await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
      console.log('Usuário criado com sucesso.');

      return res.status(201).json();
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }

  async update(req, res) {
    const { name, email } = req.body;
    const { id } = req.params;

    try {
      console.log('Tentando conectar ao banco de dados...');
      const database = await sqliteConnection();
      console.log('Conexão estabelecida.');

      const user = await database.get(`SELECT * FROM users WHERE id = ?`, [id]);

      if (!user) {
        console.error('Usuário não encontrado.');
        throw new AppError("Usuário não encontrado");
      }

      const userWithUpdatedEmail = await database.get(`SELECT * FROM users WHERE email = ?`, [email]);

      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        console.error('Este email já está em uso.');
        throw new AppError("Este email já está em uso.");
      }

      user.name = name;
      user.email = email;

      await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        updated_at = ?
        WHERE id = ?`, 
        [user.name, user.email, new Date(), id]
      );
      console.log('Usuário atualizado com sucesso.');

      return res.status(200).json();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
}

module.exports = usersController;