const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);


const restaurantesRoutes = require("./restaurante.routes.js");
router.use("/restaurantes", restaurantesRoutes);

const ciudadesRoutes = require("./ciudad.routes.js");
router.use("/ciudades", ciudadesRoutes);

const profileRoutes = require("./profile.routes.js");
router.use("/profile", profileRoutes);


module.exports = router;
