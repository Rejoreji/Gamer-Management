const yup = require("yup");

const registerSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
  dob: yup.date().required().label("Date Of Birth"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().required().label("Password"),
});

module.exports = { registerSchema, loginSchema };
