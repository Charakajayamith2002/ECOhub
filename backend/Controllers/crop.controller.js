const Crop = require("../models/crop");
const cloudinary = require("../utils/cloudinaryConfig");

// Create a new crop
exports.createCrop = async (req, res) => {
  try {
    const data = req.body;

    // Basic Validation
    if (!data.userId || !data.cropName || !data.cropType || !data.plantingDate || !data.estimatedHarvestDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate planting and harvest dates
    const plantingDate = new Date(data.plantingDate);
    const estimatedHarvestDate = new Date(data.estimatedHarvestDate);
    if (estimatedHarvestDate <= plantingDate) {
      return res.status(400).json({ message: "Estimated harvest date must be after planting date" });
    }

    // Validate Image Upload
    if (!data.cropImage) {
      return res.status(400).json({ message: "Crop image is required" });
    }

    let uploadedImage;
    try {
      uploadedImage = await cloudinary.uploader.upload(data.cropImage, { folder: "crop_images" });
    } catch (uploadError) {
      return res.status(500).json({ message: "Failed to upload image to Cloudinary", error: uploadError.message });
    }

    // Create Crop Entry
    const newCrop = new Crop({
      ...data,
      cropImage: { public_id: uploadedImage.public_id, url: uploadedImage.secure_url },
    });

    await newCrop.save();
    res.status(201).json({ message: "Crop added successfully", crop: newCrop });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit an existing crop
exports.editCrop = async (req, res) => {
    try {
      const { id } = req.params; // Use id instead of cropId
      const data = req.body;
  
      // Find the existing crop
      const existingCrop = await Crop.findById(id);
      if (!existingCrop) {
        return res.status(404).json({ message: "Crop not found" });
      }
  
      // Validate planting and harvest dates if updated
      if (data.plantingDate && data.estimatedHarvestDate) {
        const plantingDate = new Date(data.plantingDate);
        const estimatedHarvestDate = new Date(data.estimatedHarvestDate);
        if (estimatedHarvestDate <= plantingDate) {
          return res.status(400).json({ message: "Estimated harvest date must be after planting date" });
        }
      }
  
      // If a new image is uploaded, replace the existing image in Cloudinary
      if (data.cropImage) {
        try { 
          // Delete old image from Cloudinary if it exists
          if (existingCrop.cropImage && existingCrop.cropImage.public_id) {
            await cloudinary.uploader.destroy(existingCrop.cropImage.public_id);
          }
  
          // Upload new image
          const uploadedImage = await cloudinary.uploader.upload(data.cropImage, { folder: "crop_images" });
          data.cropImage = { public_id: uploadedImage.public_id, url: uploadedImage.secure_url };
        } catch (uploadError) {
          return res.status(500).json({ message: "Failed to upload image to Cloudinary", error: uploadError.message });
        }
      }
  
      // Update the crop details
      const updatedCrop = await Crop.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  
      res.status(200).json({ message: "Crop updated successfully", crop: updatedCrop });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getAllCrops = async (req, res) => {
    try {
      const crops = await Crop.find().populate("userId", "name email"); // Populate user info if needed
      res.status(200).json({ message: "Crops fetched successfully", crops });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

  exports.deleteCrop = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the crop by ID
      const crop = await Crop.findById(id);
      if (!crop) {
        return res.status(404).json({ message: "Crop not found" });
      }
  
      // Delete the image from Cloudinary if it exists
      if (crop.cropImage && crop.cropImage.public_id) {
        try {
          await cloudinary.uploader.destroy(crop.cropImage.public_id);
        } catch (cloudinaryError) {
          return res.status(500).json({ message: "Failed to delete image from Cloudinary", error: cloudinaryError.message });
        }
      }
  
      // Delete the crop from the database
      await Crop.findByIdAndDelete(id);
  
      res.status(200).json({ message: "Crop deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };