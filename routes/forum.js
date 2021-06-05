const express = require("express");
const router = express.Router();

// // MODELS
const User = require("../models/user");
const Function = require("../models/function");
const PostModel = require("../models/post");

// /// CLOUDINARY MULTER
const fileUploader = require("../configs/cloudinary.config");
const upload = fileUploader.single("avatar");

// /// UTILS
const routeGuard = require("../configs/route-gard-isLog");

/* GET home page */
router.get("/:catname", async (req, res, next) => {
  if (req.params.catname === "presentation") {
    const { page = 1, limit = 4 } = req.query;
    try {
      // execute query with page and limit values
      const users = await User.find()
        .select("-password")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      // compter le nombre de présentations et calculer le nombre de page en conséquences pour pagination dans vue
      const nbDoc = await User.countDocuments({}).exec();
      let nbPage = Math.floor(nbDoc / limit);
      if (nbDoc % nbPage !== 0) {
        nbPage++;
      }

      const usersDataView = users.map((el) => {
        return {
          ...el._doc,
          nbPost: el.posts.length,
          nbFun: el.functions.length,
        };
      });
      // on retourne seulement la donnée si query data sinon on envoi la vue
      if (req.query.data) {
        res.json({
          users: usersDataView,
          nbPage: nbPage,
          page: page,
          limit: limit,
        });
        return;
      }
      // console.log(usersDataView);
      let pagination = { one: false, two: false, tree: false, four: false, more: false };
      if (nbPage < 3) {
        pagination.one = true;
        pagination.two = true;
      } else if (nbPage < 4) {
        pagination.one = true;
        pagination.two = true;
        pagination.tree = true;
      } else {
        if (nbPage > 4) pagination.more = true;
        pagination.one = true;
        pagination.two = true;
        pagination.tree = true;
        pagination.four = true;
      }
      // dev
      pagination.more = true;

      res.render("forum/presentation", {
        users: usersDataView,
        nbPage: nbPage,
        page: page,
        limit: limit,
        pagination: pagination,
        title: "Presentations",
        style: "presentations",
        script: "presentations",
        isLog: !!req.user,
      });
      return;
    } catch (err) {
      next(err);
    }
  }
  // voir si details catname
  if (req.params.catname === "function") {
  }
  if (req.params.catname === "home") {
    try {
      const { page = 1, limit = 4 } = req.query;
      let fun = await Function.find({}).sort({ createdAt: -1 }).exec();
      let post = await PostModel.find({ categorie: "question" }).sort({ createdAt: -1 }).exec();
      // execute query with page and limit values
      const users = await User.find()
        .select("-password")
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      // compter le nombre de présentations et calculer le nombre de page en conséquences pour pagination dans vue
      const nbDoc = await User.countDocuments({}).exec();
      let nbPage = Math.floor(nbDoc / limit);
      if (nbDoc % nbPage !== 0) {
        nbPage++;
      }

      const usersDataView = users.map((el) => {
        return {
          ...el._doc,
          nbPost: el.posts.length,
          nbFun: el.functions.length,
        };
      });
      // on retourne seulement la donnée si query data sinon on envoi la vue
      if (req.query.data) {
        res.json({
          users: usersDataView,
          nbPage: nbPage,
          page: page,
          limit: limit,
        });
        return;
      }
      // console.log(usersDataView);
      let pagination = { one: false, two: false, tree: false, four: false, more: false };
      if (nbPage < 3) {
        pagination.one = true;
        pagination.two = true;
      } else if (nbPage < 4) {
        pagination.one = true;
        pagination.two = true;
        pagination.tree = true;
      } else {
        if (nbPage > 4) pagination.more = true;
        pagination.one = true;
        pagination.two = true;
        pagination.tree = true;
        pagination.four = true;
      }
      // dev
      pagination.more = true;

      // res.render("forum/presentation", {
      //   users: usersDataView,
      //   nbPage: nbPage,
      //   page: page,
      //   limit: limit,
      //   pagination: pagination,
      //   title: "ForumHome",
      //   style: "presentations",
      //   script: "presentations",
      //   isLog: !!req.user,
      // });
      res.render("forum/home", {
        users: usersDataView,
        nbPage: nbPage,
        page: page,
        limit: limit,
        pagination: pagination,
        title: "ForumHome",
        style: "presentations",
        script: "presentations",
        isLog: !!req.user,
        posts: post,
        functions: fun,
      });
    } catch (error) {
      next(error);
    }
  }
  if (req.params.catname === "answer") {
    routeGuard(req, res);
    res.render("forum/answer", {
      isLog: true,
      title: "Question",
      style: "answer",
      module: "answer",
    });
    return;
  }
  next();
});

router.post("/:catname", (req, res, next) => {
  // /////////////PRESENTATION
  if (req.params.catname === "presentation") {
    return;
  }
  // /////////////FUNCTION
  if (req.params.catname === "function") {
    const { name, body } = req.body;
    if (!name || !body || body === "return") {
      res.render("forum/function", {
        errorMessage: "Le nom de fonction et le corps de fonction sont requis.",
        style: "function",
        module: "function",
      });
      return;
    }
    const args = req.body["[args]"];
    console.log(name, args, body, req.body, req.user._id);
    // / TODO VERIF DATA

    new Function({ name: name, args: args, body: body, userId: req.user._id })
      .save()
      .then((funInDb) => {
        User.findById(req.user._id).then((userInDb) => {
          userInDb.functions.push(funInDb._id);
          userInDb.save().then((updateUser) => {
            res.json({ fun: funInDb, upUser: updateUser });
          });
        });
      })
      .catch((err) => next(err));
    return;
  }
  // /////////////ANSWER///////////////////
  if (req.params.catname === "answer") {
  }
  // si pas de route trouver continue vers 404 error
});

router.get("/:catname/:id", (req, res, next) => {
  if (req.params.catname === "presentation") {
  }
  if (req.params.catname === "function") {
    Function.findById(req.params.id).then((funFromDb) => {
      res.render("forum/detail/function", { function: funFromDb });
      return;
    });
  }
  if (req.params.catname === "home") {
  }
  if (req.params.catname === "answer") {
    PostModel.findById(req.params.id)
      .then((questionFromDb) => {
        User.findById(questionFromDb.userId)
          .select("avatar name createdAt")
          .then((userFromDb) => {
            PostModel.find({ fromQuestion: questionFromDb._id }).then((answersFromDb) => {
              console.log("lutilisateur est", userFromDb);
              if (answersFromDb.length === 0) {
                res.render("forum/detail/answer", { question: questionFromDb, userq: userFromDb });
              } else {
                res.render("forum/detail/answer", {
                  question: questionFromDb,
                  answers: answersFromDb,
                  userq: userFromDb,
                  script: "answer",
                });
              }
            });
          });
        return;
      })
      .catch((err) => next(err));
  }
});
router.get("/:catname/new", (req, res, next) => {
  if (req.params.catname === "presentation") {
  }
  if (req.params.catname === "function") {
    routeGuard(req, res);
    res.render("forum/function", {
      isLog: true,
      title: "Function",
      style: "function",
      module: "function",
    });
    return;
  }
  if (req.params.catname === "home") {
  }
  if (req.params.catname === "answer") {
    console.log(req.body, req.query);
    const { title = "answer", body } = req.body;
    const categorie = req.query.type;
    let fromQuestion = false;
    if (categorie === "answer") {
      fromQuestion = req.query.from;
    }
    const userId = req.user._id;
    // const withFunction=req.function._id

    console.log(req.user._id);

    console.log("title", title);
    if (!title || !body) {
      res.render("forum/answer", {
        isLog: true,
        errorMessage: "Veuillez remplir le titre",
        style: "answer",
        module: "answer",
      });
      return;
    }
    let newPost = {
      title: title,
      body: body,
      categorie: categorie,
      userId: userId,
    };
    console.log("mon nvx poste", newPost);
    if (fromQuestion) {
      newPost.fromQuestion = fromQuestion;
    }
    new PostModel(newPost)
      .save()
      .then(function (answersFromDb) {
        if (categorie === "question") {
          res.redirect("/forum/home");
        }
        if (categorie === "answer") {
          res.redirect("/forum/answer/" + fromQuestion);
        }
      })
      .catch((err) => next(err));
  }
});
module.exports = router;
