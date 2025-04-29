const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CropSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cropName: {
    type: String,
    required: true,
  },
  cropType: {
    type: String,
    enum: ["Seasonal", "Perennial", "Annual"],
    required: true,
  },
  fieldLocation: {
    type: String, // GPS coordinates or manual entry
    required: true,
  },
  soilType: {
    type: String,
    enum: ["Sandy", "Clay", "Loamy"],
    required: true,
  },
  plantingDate: {
    type: Date,
    required: true,
  },
  estimatedHarvestDate: {
    type: Date,
    required: true,
  },
  growthStage: {
    type: String,
    enum: ["Seedling", "Vegetative", "Flowering", "Maturity"],
    required: true,
  },
  healthStatus: {
    type: String,
    enum: ["Healthy", "At-Risk", "Infected"],
    default: "Healthy",
  },
  fertilizerUsed: [
    {
      fertilizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fertilizer",
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  cropImage: {
    public_id: String, // Cloudinary Image ID
    url: {
      type: String,
      required: true,
    },
  },

  weatherData: {
    temperature: Number,
    humidity: Number,
    rainfall: Number,
    lastUpdated: Date,
  },
  reminders: [
    {
      message: String,
      dueDate: Date,
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
  notes: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Crop", CropSchema);