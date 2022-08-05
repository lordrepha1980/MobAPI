const Koa       = require("koa");
const Router    = require('@koa/router');

const router    = new Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Data API");
});

module.exports = router;
