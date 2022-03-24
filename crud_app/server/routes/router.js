const express=require('express')
const route=express.Router()

const services = require('../services/render')

const controller=require('../controller/controller')

route.get('/',services.homeRoutes)

route.get('/welcome_admin',services.home)

route.get('/user_admin',services.userAdmin)

route.get('/access_request',services.access_user)

route.get('/add_user',services.add_user)

route.get('/edit_user',services.edit_user)

//API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);


module.exports=route