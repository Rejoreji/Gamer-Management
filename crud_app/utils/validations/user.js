const yup = require("yup");

const newUserSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  email: yup.string().email().required().label("Email"),
  department: yup.string().required().label("Department"),
  phoneNumber: yup.string().required().label("Phone number"),
  address: yup.string().required().label("Address"),
  password: yup.string().required().label("Password"),
  dob: yup.string().required().label("Date Of Birth"),
  accessType: yup.string().required().label("Access Type"),
});

const updateProfileSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  lastName: yup.string().required().label("Last Name"),
  department: yup.string().notRequired().label("Department"),
  phoneNumber: yup.string().notRequired().label("Phone number"),
  address: yup.string().notRequired().label("Address"),
  password: yup.string().notRequired().label("Password"),
  dob: yup.date().required().label("Date Of Birth"),
});

module.exports = { newUserSchema, updateProfileSchema };
