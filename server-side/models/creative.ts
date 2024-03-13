import mongoose = require("mongoose");
const { Schema, model, Types, models } = mongoose;

const CreativeSchema = new Schema(
  {
    _id: {
      type: Types.ObjectId,
      ref: "User",
    },

    brandName: {
      type: String,
    },

    brandLogo: {
      type: String,
    },

    isAvailable: {
      type: Boolean,
      default: true, //Available to take orders
    },

    rating: {
      type: Number,
    },

    superCreative: {
      type: Boolean,
      default: false,
    },

    yearsOfExperience: {
      type: Number,
    },

    personalDescription: {
      type: String,
    },

    funFacts: {
      type: Array(String),
    },

    accountSetupDone: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export = models.Creative || model("Creative", CreativeSchema);
