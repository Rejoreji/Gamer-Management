const express = require("express");
const db = require("../model");
const isAuth = require("../middlewares/is-auth");
const validate = require("../utils/validations");
const validations = require("../utils/validations/user");
const Exceptions = require("../utils/custom-exceptions");
const havePermission = require("../middlewares/have-permissions");

const router = express.Router();

router.get("/profile", isAuth, async (req, res) => {
  const userId = req.query.user || req.session.user._id;
  console.log("userId: ", userId);
  const userInDb = await db.User.findById(userId);
  res.render("user_profile", { user: userInDb });
});

router.get("/create", isAuth, havePermission(), async (req, res) => {
  res.render("add_user");
});

router.post("/save-user", isAuth, async (req, res) => {
  const cleanFields = await validate({
    schema: validations.newUserSchema,
    fields: req.body,
    pageRender: "add_user",
  });

  try {
    await db.User.create(cleanFields);
    res.redirect("/user/all");
  } catch (err) {
    throw new Exceptions.HttpException({
      statusCode: 400,
      pageRender: "add_user",
      errors: ["Email already exists. Please try with different email"],
    });
  }
});

router.post("/profile/:userId", isAuth, async (req, res) => {
  const PAGE_RENDER = "user_profile";
  const userId = req.params.userId;
  const userInDb = await db.User.findById(userId);

  const cleanFields = await validate({
    schema: validations.updateProfileSchema,
    fields: req.body,
    pageRender: PAGE_RENDER,
    user: userInDb,
  });

  const { password, ...userFields } = cleanFields;
  if (password) {
    userFields.password = password;
  }

  if (req.session.user.accessType === "Admin") {
    if (userInDb.accessType !== userFields.accessType) {
      userFields.status = "";
    }
  }

  try {
    await db.User.findByIdAndUpdate(userId, { $set: userFields });
    res.redirect("/user/profile?user=" + userId);
  } catch (err) {
    throw new Exceptions.HttpException({
      pageRender: PAGE_RENDER,
      statusCode: 500,
      user: userInDb,
      errors: ["Something goes wrong while updating user profile"],
    });
  }
});

router.get("/all", isAuth, async (req, res) => {
  const department = req.query.department;

  if (!department || department === "All") {
    const users = await db.User.find();
    res.render("user_admin", { users });
  } else {
    const users = await db.User.find({ department });
    res.render("user_admin", { users, department });
  }
});

router.get("/access-requests", isAuth, havePermission(), async (req, res) => {
  const department = req.query.department;

  if (!department || department === "All") {
    const users = await db.User.find();
    res.render("access_requests", { users });
  } else {
    const users = await db.User.find({ department });
    res.render("access_requests", { users, department });
  }
});

router.get("/change-status/:userId", isAuth, async (req, res) => {
  const userId = req.params.userId;
  await db.User.findByIdAndUpdate(userId, { $set: { status: "Pending" } });
  res.redirect("/user/profile");
});

router.get(
  "/update-access-type/:userId",
  isAuth,
  havePermission(),
  async (req, res) => {
    const status = req.query.status;
    const userId = req.params.userId;

    let fields = { status: "Active", accessType: "Host" };
    if (status === "Declined") {
      fields.status = "Declined";
      fields.accessType = "Gamer";
    }

    await db.User.findByIdAndUpdate(userId, { $set: { ...fields } });
    res.redirect("/user/all");
  }
);

router.get("/delete/:userId", isAuth, havePermission(), async (req, res) => {
  const userId = req.params.userId;
  await db.User.findByIdAndDelete(userId);
  res.redirect("/user/all");
});

router.post("/multi-status", isAuth, havePermission(), async (req, res) => {
  console.log("multi-status: ", req.body);

  if (!req.body.selectedStatus) {
    res.redirect("/user/access-requests");
  }

  if (!Array.isArray(req.body.selectedStatus) && req.body.selectedStatus) {
    await db.User.findByIdAndUpdate(req.body.selectedStatus, {
      $set: {
        status: req.body.status,
        accessType: req.body.status === "Approved" ? "Host" : "Gamer",
      },
    });
  } else {
    for (let i = 0; i < req.body.selectedStatus.length; i++) {
      const userId = req.body.selectedStatus[i];
      await db.User.findByIdAndUpdate(userId, {
        $set: {
          status: req.body.status,
          accessType: req.body.status === "Approved" ? "Host" : "Gamer",
        },
      });
    }
  }

  res.redirect("/user/access-requests");
});

router.get("/logout", isAuth, async (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/auth/login");
  });
});

module.exports = router;
