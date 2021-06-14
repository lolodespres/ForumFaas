const express = require("express");
const router = express.Router();
const Fun = require("../models/function");
const fs = require("fs");
const cors = require("cors");
const { throws } = require("assert");
const { Error } = require("mongoose");
const corsOptions = { origin: "*" };
/* GET home page */
router.get("/:name", (req, res, next) => {
  res.status(400);
  res.json({ error: "only post request are allowed on this route" });
});

// router.options("/:name", cors(corsOptions), (req, res) => {
//   res.header("Access-Control-Allow-Origin", "*");
// });
router.post("/:name", cors(corsOptions), async (req, res, next) => {
  // console.log(req);
  Fun.find({ name: req.params.name })
    .then((ret) => {
      console.log("body", req.body);
      console.log("ret[0]", ret[0]);
      let data = ret[0];
      const valuesArgs = [];
      if (data.args.length !== 0) {
        data.args.forEach((nameArgs) => {
          valuesArgs.push(req.body[nameArgs]);
        });
      }
      console.log("valueArgs=>", valuesArgs);
      let path = `${__dirname}/../tmpfolder/${data.name}.js`;
      let args = data.args.reduce((acc, val) => {
        return acc + "," + val;
      });

      const fileText = `
function ${data.name}(${args}) {
    ${data.body}
}

module.exports = ${data.name};`;
      fs.writeFileSync(path, fileText, { flag: "w+" });
      const fun = require(`../tmpfolder/${data.name}.js`);
      try {
        let datatoret = fun.apply(null, [...valuesArgs, res]);
      } catch (error) {
        res.send({ status: "error", name: error.name, message: error.message });
        return;
      }
      fs.unlinkSync(path, (err) => {
        if (err) console.log(err);
      });
      res.header("Access-Control-Allow-Origin", "*");
      res.json({ status: "ok", data: datatoret });
    })
    .catch((err) => { console.log(err)});
});

module.exports = router;
