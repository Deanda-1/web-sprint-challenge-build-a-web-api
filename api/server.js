const express = require('express');
const server = express();
const morgan = require('morgan');
const projectsRouter = require('./projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());

server.use(morgan('dev'));

server.use('/api/projects', projectsRouter);


server.use('/api/actions', actionsRouter);

module.exports = server;
