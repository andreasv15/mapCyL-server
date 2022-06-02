const router = require("express").Router();
const UserModel = require("../models/User.model");
const bcryptjs = require("bcryptjs");


// rutas de auth

//? POST "/api/auth/signup" => registro del usuario
router.post("/signup", async (req,res,next) => {

    const { nombre, username, email, password } = req.body;

    //! VALIDACIONES DE BACKEND
    if (!nombre || !username || !email || !password) {
        res.status(400).json({ errorMessage: "Los campos no están completos" });
        return;
    }

    //! NO OLVIDAR VALIDACIONES DE CONTRASEÑA, FORMATO DE EMAIL

    try {
        const foundUserEmail = await UserModel.findOne({ email });
        const foundUserUsername = await UserModel.findOne({ username });

        //* busca si hay algun usuario con el email o username pasados por parametros

        if (foundUserEmail !== null) {
            res.status(400).json({ errorMessage: "El correo electrónico ya está registrado" });
            return;
        } else if (foundUserUsername !== null) {
            res.status(400).json({ errorMessage: "El nombre de usuario ya está registrado" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassowrd = await bcryptjs.hash(password, salt);

        await UserModel.create({
            nombre,
            username,
            email,
            password: hashPassowrd
        })

        res.json("Todo bien, usuario creado");
        
    } catch (error) {
        next(error)
    }
})


//? POST "/api/auth/login" => chequeo de credenciales
router.post("/login", async (req, res, next) => {

    const { identificador, password } = req.body;

    try {
        const foundUser = await UserModel.findOne({ $or: [{username : identificador }, {email: identificador }]  }); //* para que permita hacer login con username o email.
        // const foundUser = await UserModel.findOne({ username }); //* permite login solo con el username
        

        if (foundUser === null) {
            res.status(400).json({ errorMessage: "El usuario introducido no está registrado" });
            return;
        }

        // Si el usuario existe, comprobamos que la contraseña introducida es la correcta usando el metodo compare
        const checkPassword = await bcryptjs.compare( password, foundUser.password )

        console.log("pass: ", checkPassword); // devuelve true o false 

        if (checkPassword === false) {
            res.status(401).json({ errorMessage: "La contraseña no es correcta" }); // status 401 sin autorizacion
            return;
        }

        // Credenciales correctas, procedemos a crear el token
        



    } catch (error) {
        next(error);
    }



})





module.exports = router;
