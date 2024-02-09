const jwt = require("jsonwebtoken");

const registerTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_EXPIRES,
  });

  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_EXPIRES,
  });

  return { accessToken, refreshToken };
};

module.exports = registerTokens;