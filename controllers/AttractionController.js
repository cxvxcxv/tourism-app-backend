import AttractionModel from "../models/Attraction.js";
import { validationResult } from "express-validator";

export const getAll = async (req, res) => {
  try {
    const attractions = await AttractionModel.find();
    res.json(attractions);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Ошибка получения статей",
    });
  }
};

export const getOne = async (req, res) => {
  const attraction = await AttractionModel.findById(req.params.id)
    .populate("comments")
    .exec();

  res.json(attraction);
};

export const comment = async (req, res) => {
  try {
    //validation

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()); //returns an error if inputs are invalid
    }

    //finding an attraction and pushing a new comment in array

    const doc = await AttractionModel.findById(req.params.id);
    await doc.comments.push({
      text: req.body.text,
      author: req.userId,
    });

    const attraction = await doc.save(); //saving document
    res.json(attraction);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Ошибка отправки комментария",
    });
  }
};

export const review = async (req, res) => {
  try {
    //validation

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array()); //returns an error if inputs are invalid
    }

    //finding an attraction and pushing a new review in array

    const doc = await AttractionModel.findById(req.params.id);
    await doc.reviews.push({
      text: req.body.text,
      author: req.userId,
      score: req.body.score,
    });

    const attraction = await doc.save(); //saving document
    res.json(attraction);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Ошибка отправки отзыва",
    });
  }
};

export const react = async (req, res) => {
  try {
    const result = await AttractionModel.updateOne(
      {
        _id: req.params.id,
      },
      {
        $inc: { "comments.$[item].likes": req.body.value },
      },
      {
        arrayFilters: [{ "item._id": req.params.comment_id }],
      }
    );

    res.json(result);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Ошибка отправки реакции",
    });
  }
};
