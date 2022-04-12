const Exceptions = require("../custom-exceptions");

module.exports = async function ({
  schema,
  fields,
  abortEarly = false,
  pageRender,
  ...rest
}) {
  try {
    return await schema.validate(fields, { abortEarly });
  } catch (ex) {
    throw new Exceptions.HttpException({
      statusCode: 422,
      message: "Please enter valid information",
      errors: ex.errors,
      pageRender,
      ...rest,
    });
  }
};
