const userModel = require("../Model/signup.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.newUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const userData = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(200).send({
      message: "userCreated",
      data: userData,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("user Not found");
      res.status(400).send({
        message: "User Not Found",
      });
    }
    const verify = bcrypt.compareSync(password, user.password);
    if (verify) {
      console.log("Login successfully for user:", user.name);
      const token = jwt.sign({ email: user.email, id: user.id }, "iam Govind", {
        expiresIn: 15000,
      });
      console.log("token", token);

      res.status(200).send({
        message: "Login Successfully",
        data: {
          name: user.name,
          email: user.email,
          token,
        },
      });
    }
  } catch (error) {}
};
