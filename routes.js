const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const produtoController = require('./src/controllers/produtoController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

//Rotas de login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)

route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//Rotas para produto
route.get('/produto/index', loginRequired, produtoController.index)
route.post('/produto/register', loginRequired, produtoController.register)
route.get('/produto/index/:id', loginRequired, produtoController.edit)
route.post('/produto/edit/:id', loginRequired, produtoController.edited)
route.get('/produto/delete/:id', loginRequired, produtoController.delete)

module.exports = route;