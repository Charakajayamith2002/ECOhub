const cloudinary = require("../utils/cloudinaryConfig");
const Crop = require("../models/crop");

exports.createCrop = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Crop image is required" });
    }

    // Upload image to Cloudinary using buffer
    const uploadedImage = await cloudinary.uploader.upload(`data:image/png;base64,${req.file.buffer.toString("base64")}`, {
      folder: "crop_images",
    });

    // Ensure planting date and estimated harvest date are valid
    const plantingDate = new Date(req.body.plantingDate);
    const estimatedHarvestDate = new Date(req.body.estimatedHarvestDate);
    if (estimatedHarvestDate <= plantingDate) {
      return res.status(400).json({ message: "Estimated harvest date must be after planting date" });
    }

    const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === 'cropImage') {
    const file = files[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, cropImage: 'Only JPG and PNG files are allowed.' }));
    } else {
      setErrors((prev) => ({ ...prev, cropImage: null }));
      setFormData((prev) => ({ ...prev, cropImage: file }));
    }
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


    // Create crop entry
    const cropData = {
      ...req.body,
      cropImage: { public_id: uploadedImage.public_id, url: uploadedImage.secure_url },
    };

    const newCrop = new Crop(cropData);
    await newCrop.save();

    return res.status(201).json({ message: "Crop added successfully", crop: newCrop });
  } catch (error) {
    console.error("Error creating crop:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Edit an existing crop
exports.editCrop = async (req, res) => {
  try {
    const { id } = req.params;
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
    
    // Handle image upload if a new file was provided
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (existingCrop.cropImage && existingCrop.cropImage.public_id) {
        await cloudinary.uploader.destroy(existingCrop.cropImage.public_id);
      }
      
      // Upload new image to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(
        `data:image/png;base64,${req.file.buffer.toString("base64")}`,
        {
          folder: "crop_images",
        }
      );
      
      // Update the cropImage field
      data.cropImage = { 
        public_id: uploadedImage.public_id, 
        url: uploadedImage.secure_url 
      };
    } else {
      // If no new image is provided, keep the existing image
      data.cropImage = existingCrop.cropImage;
    }
    
    // Remove any properties that should not be updated
    const updateData = { ...data };
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.__v;
    
    // Update the crop details
    const updatedCrop = await Crop.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });
    
    if (!updatedCrop) {
      return res.status(500).json({ message: "Failed to update crop" });
    }
    
    return res.status(200).json({ 
      success: true,
      message: "Crop updated successfully", 
      crop: updatedCrop 
    });
    
  } catch (error) {
    console.error("Error in update:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
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

  // Controller method to fetch a crop by its ID


  exports.getCropById = async (req, res) => {
    try {
      const { id } = req.params; // Get the crop ID from the URL
      const crop = await Crop.findById(id).populate('userId'); // Populate userId field
  
      if (!crop) {
        return res.status(404).json({ message: "Crop not found" });
      }
  
      res.status(200).json({ crop }); // Return the crop data with populated userId
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
