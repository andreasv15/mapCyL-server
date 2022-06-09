const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
      // unique: true -> Ideally, should be unique, but its up to you
    }, 
    email: {
      type: String,
      required: true,
      unique: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true
    },
    visitado: [{
      type: Schema.Types.ObjectId,
      ref: "restaurante"
    }],
    pendiente: [{
      type: Schema.Types.ObjectId,
      ref: "restaurante"
    }]
     
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
