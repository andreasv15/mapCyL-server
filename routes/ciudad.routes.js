const router = require("express").Router();
const CiudadModel = require("../models/Ciudad.model");

//? GET "/api/ciudades" => todas las ciudades
router.get("/", async (req, res, next) => {
    try {
        const allCiudades = await CiudadModel.find();
        res.json(allCiudades);


    } catch (error) {
        next(error)
    }

})


module.exports = router;
