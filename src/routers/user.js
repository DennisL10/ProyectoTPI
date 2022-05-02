const expresss = require("express");
const router = expresss.Router();

//Crear Usuario
router.post('/users', (req, res) => {
    res.send("Crear Usuario");
});
module.exports = router;