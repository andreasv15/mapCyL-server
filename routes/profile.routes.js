const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const UserModel = require("../models/User.model");


//? GET "/profile/" => detalles del perfil
router.get("/", isAuthenticated, async (req,res,next) => {
    // console.log("payload: ", req.payload)

    // console.log("desde back: ", identificador, password)
    
    try {
        const usuario = await UserModel.findById(req.payload._id).populate("visitado").populate("pendiente")

        // console.log("desde backend: ", usuario)
        res.json(usuario)

    } catch (error) {
        next(error)
    }


})


//? POST "/profile/add-visitado" => modifica los restaurantes visitados
router.post("/add-visitado", isAuthenticated, async (req,res,next) => {
    const { _id  } = req.body;
    // console.log("id restaurante:", _id)

    
    try {
        const infoUser = await UserModel.findByIdAndUpdate(req.payload._id, { $addToSet : { visitado: _id} })

    } catch (error) {
        next(error)
    }

})


// //? POST "//profile/add-pendiente" => modifica los restaurantes pendientes
router.post("/add-pendiente", isAuthenticated, async (req,res,next) => {
    const { _id  } = req.body;
    // console.log("id restaurante:", _id)

    
    try {
        const infoUser = await UserModel.findByIdAndUpdate(req.payload._id, { $addToSet : { pendiente: _id} })
     

    } catch (error) {
        next(error)
    }

})


module.exports = router;



