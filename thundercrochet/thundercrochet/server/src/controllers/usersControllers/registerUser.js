require("dotenv").config();
const { User } = require("../db");
const bcrypt = require("bcrypt");
const registerTokens = require('../../middlewares/tokens/registerTokens');
const sendVerifyEmail = require('../../middlewares/email/sendVerifyEmail');

const uuid = require("uuid");

const registerUser = async (req, res) => {
  const { name, last_name, phone_number, address, email, password } = req.body;

  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      throw new Error("Este usuario ya está registrado.");
    }

    const confirmationToken = uuid.v4();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      last_name,
      phone_number,
      address,
      email,
      password: hashedPassword,
      confirmationToken,
    });

    if (newUser) {
      const data = {
        name,
        message: 'Usuario creado con éxito!'
      };

      if (!newUser.verify) {
        await sendVerifyEmail(newUser.email, newUser._id);
      }

      const { accessToken, refreshToken } = registerTokens.signTokens(newUser._id);

      return { access: true, accessToken, refreshToken, data };
    } else {
      throw new Error("User couldn't be created.");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = registerUser;