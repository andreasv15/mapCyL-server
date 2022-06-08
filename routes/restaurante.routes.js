const router = require("express").Router();
const RestauranteModel = require("../models/Restaurante.model");
const CiudadModel = require("../models/Ciudad.model");
const UserModel = require("../models/User.model");

// rutas de restaurantes

//? GET "/api/restaurantes/ciudad" => Lista todos los restaurantes de la ciudad
router.get("/:ciudad", async (req, res, next) => {

    // const { ciudad } = req.params;

    const estaCiudad = req.params.ciudad;

    //console.log("esta ciudad: ", estaCiudad)

    try {
        // const foundCiudad = await CiudadModel.findOne({'nombre': estaCiudad});
        // console.log("foundCiudad:", foundCiudad)
        const allRest = await RestauranteModel.find().populate("ciudad")

        //console.log("allrest: ", allRest);
        // const restaurantes = await RestauranteModel.find({ "ciudad": estaCiudad})

        const filteredArr = allRest.filter((eachRest) => {
            // console.log("filtered function")
            console.log("ciudad eachrest: ", eachRest.ciudad)
            console.log("===================", eachRest.ciudad.nombre === estaCiudad);
            if (eachRest.ciudad.nombre == estaCiudad) {
                //console.log("eachRest ciudad nombre: ", eachRest.ciudad.nombre);
                //console.log("eachRest: ", eachRest);
                //res.status(200).json(eachRest)
                return true;
            } else {
                // console.log("no hay restaurantes");
                //res.status(401).json( { errorMessage: "No hay restaurantes en esta ciudad" });
                //console.log("error")
                return false;
            }
        })
        // console.log("filtered: ", filteredArr);

        if (filteredArr.length > 0) {
            res.json(filteredArr)
        } else {
            res.json( {errorMessage: "No hay restaurantes en esta ciudad"} )
        }       

    } catch (error) {
        next(error)
    }

})

//? POST "/api/restaurantes/add-restaurante" => Crea un nuevo restaurante para la ciudad
router.post("/add-restaurante", async (req,res,next) => {

    const { nombre, imagen, direccion, ciudad, puntuacion } = req.body;

    console.log('ciudad: ', ciudad);
    // console.log(req.body);

    if (!nombre || !direccion || puntuacion === undefined || ciudad === null) {
        res.status(400).json({ errorMessage: "Los campos no están completos" });
        return;
    }

    try {
        const foundCiudad = await CiudadModel.findOne({'nombre': ciudad});
        
        //console.log('found ciudad: ', foundCiudad._id);

        const foundRestaurante = await RestauranteModel.findOne({direccion})
        
        if (foundRestaurante !== null) {
            res.status(400).json( {errorMessage: "Ya existe otro restaurante con la misma dirección"} )
            return;
        }
        
        await RestauranteModel.create({
            nombre, 
            imagen, 
            direccion,
            ciudad: foundCiudad,
            puntuacion
        })

        res.json("Todo bien, restaurante creado");

    } catch (error) {
        next(error)
    }


})

//? PATCH "/api/restaurantes/:id" => editar un restaurante
router.patch("/:id", async (req,res,next) => {
    const { id } = req.params;
    const { nombre, imagenes, direccion, ciudad, puntuacion } = req.body;


    if (!nombre || !direccion || ciudad === null) {
        res.status(400).json({ errorMessage: "Los campos no están completos" });
        return;
    }



    try {
        const foundCiudad = await CiudadModel.findOne({'nombre': ciudad});

        await RestauranteModel.findByIdAndUpdate(id, {
            nombre,
            direccion,
            ciudad: foundCiudad,
            puntuacion
        })
        res.json("El restaurante ha sido actualizado");

    } catch (error) {
        next(error);
    }


})

//? DELETE "/api/restaurantes/:id" => borrar un restaurante
router.delete("/:id", async (req,res,next) => {

    const { id } = req.params;

    try {
        await RestauranteModel.findByIdAndDelete(id)
        res.json("El restaurante ha sido borrado"); //! no importa lo que enviemos, siempre hay que dar una respuesta, si no hacemos esto, se queda en sending request, borra el elemento pero en el frontend se queda "pensando"
        
    } catch (error) {
        next(error);
    }
})


//? GET "/api/restaurantes/id" => muestra detalle de restaurante
router.get("/:id/details", async (req, res, next) => {
    const {id } = req.params;


    try {
        const restauranteDetail = await RestauranteModel.findById( id ).populate("ciudad")
        res.json(restauranteDetail);
        
    } catch (error) {
        next(error)
    }


})


//? GET "/api/restaurantes" => Lista todos los restaurantes
router.get(("/"), async (req,res,next) => {
    try {
        const allRestaurantes = await RestauranteModel.find().populate("ciudad")
        // console.log(allRestaurantes)
        res.json(allRestaurantes);

    } catch (error) {
        next(error)
    }
})



module.exports = router;
