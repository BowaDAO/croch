import jwt = require("jsonwebtoken");

/**
 * Generates refresh token
 * @param {string} id
 * @returns refresh token
 */

const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_LIFE_TIME,
  });
};

export = generateRefreshToken;
