const Exceptions = require("../utils/custom-exceptions");

module.exports = async function (err, req, res, next) {
  // let statusCode = 500;
  // let message = "Server error";
  // let name = "Server_Error";
  // let errors = [];
  // let fields;
  // let pageRender = "/";

  console.log(err);

  // if (err instanceof Exceptions.HttpException) {
  //   if (err instanceof Exceptions.ValidationException) {
  //     errors = err.errors;
  //   }
  //   statusCode = err.statusCode;
  //   message = err.message;
  //   name = err.name;
  //   pageRender = err.pageRender;
  //   fields = req.body;
  // }

  const pageRender = err.pageRender || "/";
  const rest = err.rest;
  const fields = req.body;
  console.log("rest ..: ", rest);

  res.render(pageRender, { pageRender, fields, ...rest });
};
