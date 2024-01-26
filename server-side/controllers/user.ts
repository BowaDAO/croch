import User = require("../models/user");
import Creative = require("../models/creative");
import Customer = require("../models/customer");
import generateAccessToken = require("../utilities/generateAccessToken");
import generateRefreshToken = require("../utilities/generateRefreshToken");
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please provide all necessary credentials." });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User already exists." });
    }

    const user = await User.create({ ...req.body });

    if (role === "customer") {
      await Customer.create({ _id: user._id });
    }

    if (role === "creative") {
      await Creative.create({ _id: user._id });
    }

    return res.json(user).status(StatusCodes.OK);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Provide your login credentials." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "User does not exist." });
    }

    const passwordIsCorrect = await user.checkPassword(password);

    if (!passwordIsCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Incorrect password." });
    }

    const refreshToken = generateRefreshToken(user?._id);

    await User.findByIdAndUpdate(
      user?._id,

      { refreshToken },

      {
        new: true,
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 60 * 1000,
    });

    const accessToken = generateAccessToken(user?._id);

    return res.status(StatusCodes.OK).json({
      id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      accessToken,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { signUp, signIn };
