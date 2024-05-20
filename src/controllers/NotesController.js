const knex = require('../database/knex')

class NotesController {
  async create(req, res) {
    const { title, description, tags, links } = req.body;
    const { user_id } = req.params;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    })

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("links").insert(tagsInsert);
    response.json();
  }

  async show(req, res) {
   const { id } = req.params

   const note = await knex('notes').where({ id }).first()

   return res.json(note);
  }
}

module.exports = NotesController;