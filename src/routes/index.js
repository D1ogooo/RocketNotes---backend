const { Router } = require('express')
const usersRoutes = require('./users.routes')
const notesRoutes = require('./notes.routes')
const tagsRouter = require('./tags.routes')

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/notes', notesRoutes);
routes.use('/tags', tagsRouter);

module.exports = routes;