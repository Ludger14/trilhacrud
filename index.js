const express = require('express')
const app = express()
const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('./models/usuarios')
const cors = require('cors')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'crudtrilha.db'
})

const users = UserModel(sequelize, DataTypes)

app.set('view engine', 'ejs')
// We need to parse JSON coming from requests
app.use(express.json())
app.use(cors())

// Create user
app.post('/usuario', async(req, res) => {
    try {
      const body = req.body  
      const userCreate = await users.create({
        nome: body.nome,
        email: body.email,
        telefone: body.telefone,
        passeio: body.passeio  
      })
      res.json(userCreate)
    } catch (error) {
      console.log(error);
    }  
  })

// List all users
app.get('/usuario', async(req, res) => {
    const allUsers = await users.findAll()    
    res.json({'allUsers': allUsers })
})

// Show usern
app.get('/usuario/:id', async(req, res) => {
    const userId = req.params.id
    const user = await users.findByPk(userId)

    res.render('usuario', { id: user.id, nome: user.nome, email: user.email, telefone: user.telefone, passeio: user.passeio })
})

// Update user
app.put('/usuario/:id', async(req, res) => {  
    try {
      const userId = req.params.id
      const body = req.body
      const userUpdate = await users.findByPk(userId)
      userUpdate.update({
        nome: body.nome,
        email: body.email,
        telefone: body.telefone,
        passeio: body.passeio
      })    
      res.send("Foi atualizado com sucesso.")
    } catch (error) {
      console.log(error);
    } 
  })

// Delete user
app.delete('/usuario/:id', async(req, res) => {
    try {
      const userId = req.params.id
      const userRemove = await users.destroy({ where: {id: userId}})
      res.send({ action: 'Deleting user', userRemove: userRemove })
    } catch (error) {
      console.log(error);
    } 
  })

app.listen(8080, () => {
    console.log('Iniciando o servidor express')
})
