const expresss = require("express");
const userShema = require("../models/pacientes");
const admin = require("../models/admin");
const bcrypt = require('bcrypt');

const router = expresss.Router();
router.use(expresss.urlencoded({extended:false}));
router.use(expresss.json());

//Crear Usuario
router.post("/users", (req, res) => {
    const user = userShema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// obtener usuarios
router.get("/users", (req, res) => {
    userShema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// obtener un usuario
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userShema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Actualizar usuario
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, sexo, edad, correo, telefono, estado, VuM } = req.body;
    userShema
    .updateOne({ _id: id }, { $set: { nombre, sexo, edad, correo, telefono, estado, VuM } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Eliminar Usuario
router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userShema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



//logueo registro
router.post("/registrologin", (req, res) => {
    const {usuario, pass, adminn, admina, admine, admins} = req.body;
    const newuser = new admin({usuario, pass, adminn, admina, admine, admins});
    newuser.save(err =>{
        if(err){
            res.status(500).send('ERROR AL REGISTRAR EL USUARIO');
        }else{
            res.status(200).send('USUARIO RESGISTRADO');
        }
    });
});

// inicio sesion
router.post("/login", (req, res) => {
    const {usuario, pass} = req.body;

    admin.findOne({usuario}, (err, user) => {
        if(err){
            return res.status(500).send('ERROR AL INICIAR SESION');
        }
        else if(!user){
            return res.status(404).send('EL USUARIO NO EXISTE');
        }
        else{
            user.isCorrectPass(pass, (err, result) => {
                if(err){
                    return res.status(500).send('ERROR AL INICIAR SESION');
                }else if(result){
                    return res.status(200).send('SESION INICIADA');
                }else{
                    return res.status(500).send('USUARIO Y/O CONTRASEÑA INCORRECTA');
                }
            });
        }

        
    });

});

module.exports = router;