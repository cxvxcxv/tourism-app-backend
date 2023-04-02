import { body } from "express-validator";

export const registerValidation = [
  body("password", "Пароль должен состоять из 8 символов минимум").isLength({
    min: 8,
  }),
  body(
    "username",
    "Имя пользователя должно состоять из 3 символов минимум"
  ).isLength({ min: 3 }),
];

export const loginValidation = [
  body("password", "Пароль должен состоять из 8 символов минимум").isLength({
    min: 8,
  }),
  body(
    "username",
    "Имя пользователя должно состоять из 3 символов минимум"
  ).isLength({ min: 3 }),
];

export const feedbackValidation = [
  body("text", "Текст не должен быть пустым").trim().notEmpty(),
];
