const expresss = require("express");
const userShema = require("../models/user");

const router = expresss.Router();

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
    const { nombre, edad, correo, telefono, estado } = req.body;
    userShema
    .updateOne({ _id: id }, { $set: { nombre, edad, correo, telefono, estado } })
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

module.exports = router;