const { Schema, model } = require("mongoose");

const restauranteSchema = new Schema ( 
    {
        nombre: {
            type: String,
            required: true,
        },
        imagen: {
            type: String,
            default: "https://media.gq.com.mx/photos/5c927b45c0e463f033a84935/16:9/w_2560%2Cc_limit/restaurante.jpg"
        },
        direccion: {
            type: String,
            required: true,
            unique: true
        },
        ciudad: {
            type: Schema.Types.ObjectId,
            ref: "ciudad",
            required: true
        },
        puntuacion: {
            type: Number,
            required: true
        }
    }
);

const Restaurante = model("restaurante", restauranteSchema);


module.exports = Restaurante;
