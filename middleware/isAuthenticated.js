const { expressjwt } = require("express-jwt");

const isAuthenticated = expressjwt({
    secret: process.env.TOKEN_SECRET,
    algorithms: ["HS256"],
    requestProperty: "payload", //* una vez que pase por el middleware, nos retorna el payload (a la funcion que ejecute este middleware)
    getToken: (req) => {

        if (req.headers === undefined || req.headers.authorization === undefined) {
            console.log("No hay token");
            return null;
        }
        //console.log("req: ", req);
        // console.log("req.headers: ", req.headers)
        //console.log(req.headers.authorization);

        const tokenArr = req.headers.authorization.split(" "); //* devuelve la cadena separada por el espacio
        const tokenType = tokenArr[0];
        const token = tokenArr[1];


        // console.log("type: ",tokenType)
        // console.log("token: ",token)

        if (tokenType !== "Bearer") {
            console.log("Tipo de token invalido");
            return null;
        }

        console.log("El token fue entregado");
        return token;

    }

})



module.exports = isAuthenticated;

