//Invocamos express
const express = require('express');
const app = express();

// seteamos urluncoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Invocamos dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// seteamos el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + 'public'));

// Establecemos motor de plantillas
app.set('view engine', 'ejs')

// Invocamos bcryptjs
const bcryptjs = require('bcryptjs');

//var de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Invocamos al modulo de conexion
const connection = require('./database/db');

//Estableciendo rutas
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.post('/register', async (req, res) =>{
    const user = req.body.user;
    const name = req.body.nom;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', {User:user, Nombre:name, Rol:rol, Pass:passwordHaash}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('register', {
                alert: true,
                alertTitle: "Registro",
                alertMessage: "Registro Exitoso!",
                alertIcon: 'success',
                showConfirmButton:false,
                timer:1500,
                ruta: ''
            })
        }
    })



})

app.listen(3000, (req, res) =>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})