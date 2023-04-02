import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ReviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AttractionSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  comments: {
    type: [CommentSchema],
    required: true,
  },
  reviews: {
    type: [ReviewSchema],
    required: true,
  },
  imageUrls: {
    type: [String],
  }
});

//comments array (object with text and likes), reviews array (object with text and score)

export default mongoose.models.Attraction ||
  mongoose.model("Attraction", AttractionSchema);
