require("dotenv").config();
const { User } = require("../db");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const uuid = require("uuid");
const nodemailer = require("nodemailer");

const URL = "http://localhost:3030";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerUser = async (req, res) => {
  const { name, last_name, phone_number, address, email, password } = req.body;

  if (!email || !password) {
    throw new Error("Todos los campos son obligatorios.");
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    throw new Error("Este usuario ya está registrado.");
  }

  const confirmationToken = uuid.v4();

  try {
    const newUser = await createusers({
      name,
      last_name,
      phone_number,
      address,
      email,
      password,
      confirmationToken,
    });
    console.log({ newUser });

    const mailOptions = {
      from: "clickyticketg18pf@gmail.com",
      to: email,
      subject: "Confirmación de Correo Electrónico",
      html: `<p style="font-size: 16px; color: #0074d9;">
      Para confirmar tu correo electrónico, haz clic <a href="${URL}/ConfirmTokenForm?token=${confirmationToken}" style="text-decoration: none; color: #ff4136; font-weight: bold;">aquí</a>.
    </p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Error al enviar el correo:", error);
      } else {
        console.log("Email enviado");
      }
    });
  } catch (error) {
    console.error("Error al registrar al usuario:", error);
    throw new Error("Error al registrar al usuario.");
  }
};

module.exports = registerUser;