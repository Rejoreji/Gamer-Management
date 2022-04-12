const bcrypt = require("bcryptjs");
const express = require("express");
const db = require("../model");
const validate = require("../utils/validations");
const validations = require("../utils/validations/auth");
const Exceptions = require("../utils/custom-exceptions");

const router = express.Router();

router.get("/register", async (req, res) => {
  res.render("sign_up");
});

router.post("/register", async (req, res) => {
  const PAGE_RENDER = "sign_up";

  const cleanFields = await validate({
    schema: validations.registerSchema,
    fields: req.body,
    pageRender: PAGE_RENDER,
  });

  try {
    await db.User.create(cleanFields);
    res.redirect("/auth/login");
  } catch (err) {
    throw new Exceptions.HttpException({
      pageRender: PAGE_RENDER,
      statusCode: 401,
      errors: ["Email Already Exists"],
    });
  }

  res.render(PAGE_RENDER);
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const PAGE_RENDER = "login";

  const cleanFields = await validate({
    schema: validations.loginSchema,
    fields: req.body,
    pageRender: PAGE_RENDER,
  });

  const userInDb = await db.User.findOne({ email: cleanFields.email });
  if (!userInDb) {
    throw new Exceptions.HttpException({
      errors: ["Email not found"],
      pageRender: PAGE_RENDER,
    });
  }

  const hasCorrectPassword = await bcrypt.compare(
    cleanFields.password,
    userInDb.password
  );
  if (!hasCorrectPassword) {
    throw new Exceptions.HttpException({
      errors: ["Password not correct"],
      pageRender: PAGE_RENDER,
    });
  }

  req.session.user = {
    _id: userInDb._id,
    email: userInDb.email,
    accessType: userInDb.accessType,
  };

  res.redirect("/welcome");
});

module.exports = router;
