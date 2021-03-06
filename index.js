const express = require('express')
const multer = require('multer')
const upload = multer({ dest: '../projetoFinal/trilhas/src/assets/img' })
const app = express()
const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('./models/usuarios')
const PasseioModel = require('./models/passeio')
const cors = require('cors')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'crudtrilha.db'
})


const users = UserModel(sequelize, DataTypes)
const walk = PasseioModel(sequelize, DataTypes)

app.set('view engine', 'ejs')
// We need to parse JSON coming from requests
app.use(express.json())
app.use(cors())
/*
app.post('/stats', upload.single('imagem'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
   console.log(req.file, req.body)
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })*/

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next){
  // req.file is the 'avatar' file
  // req.body will holk the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1}, { name: 'gallery', maxCount: 8}])
app.post('/cool-profile', cpUpload, function(req, res, next){
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})

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

  // Create walk
app.post('/passeio', upload.single('imagem'), async(req, res) => {
  console.log(req.file);
  try {
    const body = req.body  
    const walkCreate = await walk.create({
      title: body.title,
      imagem: req.file.filename,
      encontro: body.encontro,
      tempo: body.tempo,  
      dia: body.dia,
      guia: body.guia
    })
    res.json(walkCreate)
  } catch (error) {
    console.log(error);
  }  
})

// List all users
app.get('/usuario', async(req, res) => {
    const allUsers = await users.findAll()    
    res.json({'allUsers': allUsers })
})

// List all walks
app.get('/passeio', async(req, res) => {
  const allWalks = await walk.findAll()    
  res.json({'allWalks': allWalks })
})

// Show user
app.get('/usuario/:id', async(req, res) => {
    const userId = req.params.id
    const user = await users.findByPk(userId)

    res.send({ id: user.id, nome: user.nome, email: user.email, telefone: user.telefone, passeio: user.passeio })
})

// Show walk
app.get('/passeio/:id', async(req, res) => {
  const walkId = req.params.id
  const walker = await walk.findByPk(walkId)

  res.send({ id: walker.id, title: walker.title, imagem: walker.imagem, encontro: walker.encontro, tempo: walker.tempo, dia: walker.dia, guia: walker.guia })
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
      res.send({ Mensagem: "Foi atualizado com sucesso."})
    } catch (error) {
      console.log(error);
    } 
  })

// Update walk
app.put('/passeio/:id', async(req, res) => {  
  try {
    const walkId = req.params.id
    const body = req.body
    const walkUpdate = await walk.findByPk(walkId)
    walkUpdate.update({
      title: body.title,
      imagem: body.imagem,
      encontro: body.encontro,
      tempo: body.tempo,  
      dia: body.dia,
      guia: body.guia
    })    
    res.send({ Mensagem: "Foi atualizado com sucesso."})
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

// Delete walk
app.delete('/passeio/:id', async(req, res) => {
  try {
    const walkId = req.params.id
    const walkRemove = await walk.destroy({ where: {id: walkId}})
    res.send({ action: 'Deleting walk', walkRemove: walkRemove })
  } catch (error) {
    console.log(error);
  } 
})

app.listen(8080, () => {
    console.log('Iniciando o servidor express')
})