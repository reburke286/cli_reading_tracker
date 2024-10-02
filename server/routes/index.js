const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home")

router.use("/api", apiRoutes);
router.use('/', homeRoutes)

router.use((req, res) => {
  return res.send("Wrong route!");
});

module.exports = router;
