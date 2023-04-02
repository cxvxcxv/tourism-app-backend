import express from "express";
import cors from "cors";
import {
  registerValidation,
  loginValidation,
  feedbackValidation,
} from "./utils/validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as AttractionController from "./controllers/AttractionController.js";
import { connectDB } from "./utils/workMongo.js";

const PORT = process.env.port || 3001;
const app = express();

await connectDB();

app.use(express.json()); //for using request methods in future
app.use(cors()); //to avoid problems with send requests

//user registration method
app.post("/api/auth/register", registerValidation, UserController.register);

//user authorization method
app.post("/api/auth/login", loginValidation, UserController.login);

//user logged verification method
app.get("/api/auth/me", checkAuth, UserController.getMe);

//comment creation method
app.patch(
  "/api/attractions/:id",
  checkAuth,
  feedbackValidation,
  AttractionController.comment
);

//review creation method
app.put(
  "/api/attractions/:id",
  checkAuth,
  feedbackValidation,
  AttractionController.review
);

//get all attractions method
app.get("/api/attractions", AttractionController.getAll);

//get a single attractions method
app.get("/api/attractions/:id", AttractionController.getOne);

//update likes count on comments method
app.patch(
  "/api/attractions/:id/:comment_id",
  checkAuth,
  AttractionController.react
);

app.listen(PORT, () => {
  console.log("server started on port 3001");
});
