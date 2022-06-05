const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const ruta = require("./routers/index");
const cors = require('cors');

const app = express(); 
const port = process.env.PORT || 9000;


//middleware
app.use(cors())
app.use(express.json());
app.use('/HOSPITAL', ruta);



//rutas
app.get("/", (req, res) => {
    res.send("Inicio de la API");
});

// conexion
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log("Conectado A MongoDB"))
.catch((error) => console.error(error));

app.listen(port, () => console.log('Servidor Conectado en el Puerto', port));