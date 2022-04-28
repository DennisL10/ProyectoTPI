const express = require('express')
const app = express()
const path = require('path')

//Ajustes
app.set('port', 3000)

//middlewares
app.use(express.static(path.join(__dirname, 'public')))


//Rutas
app.get('/', (req, res) =>{
    res.send('Bienvenidos')
})

app.listen(app.get, ()=>{
console.log(`Aplicacion corriendo en puerto ${app.get('port')}`)
})
