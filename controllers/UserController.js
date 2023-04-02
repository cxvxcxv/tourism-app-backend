import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()); //returns error if inputs are invalid
    }

    //hashing password

    const password = req.body.password;
    const salt = await bcrypt.genSalt(7);
    const hash = await bcrypt.hash(password, salt);

    //creating a document for future user creation

    const doc = new UserModel({
      username: req.body.username,
      passwordHash: hash,
    });

    const user = await doc.save(); //saving new user in db

    //creating a web token

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret_key",
      {
        expiresIn: "30d", //expire date 30 days
      }
    );

    const { passwordHash, ...userData } = user._doc; //taking out password hash to not send it
    res.json({ ...userData, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username }); //declaring user if username exists in db

    if (!user) {
      return req.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    //declaring boolean based on passwords' identity

    const isValidPassword = await bcrypt.compare(
      req.body.password, //input password
      user._doc.passwordHash //actual password
    );

    if (!isValidPassword) {
      return req.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    //creating a web token

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret_key",
      {
        expiresIn: "30d", //expire date 30 days
      }
    );

    const { passwordHash, ...userData } = user._doc; //taking out password hash from sending message
    res.json({ ...userData, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (e) {}
};
