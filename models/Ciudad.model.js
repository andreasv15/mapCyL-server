const { Schema, model } = require("mongoose");

const ciudadSchema = new Schema( 
    {
        nombre: {
            type: String,
            required: true,
            unique: true
        },
        habitantes: {
            type: Number,
            required: true,
        },
        imagen: {
            type: String
            
        },
    }
);


const Ciudad = model("ciudad", ciudadSchema);


module.exports = Ciudad;
