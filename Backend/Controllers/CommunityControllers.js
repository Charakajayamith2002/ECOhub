// Import the Inventory model which interacts with the MongoDB collection
const Inventory = require("../models/CommunityModel");

// Get All Inventory Records
const getAllInventory = async (req, res, next) => {
  let inven;
  // Fetch all inventory documents from the database
  try {
    inven = await Inventory.find();
  } catch (err) {
    console.log(err);  // Log errors during DB operation
  }
  // If no inventory found, return 404 status
  if (!inven) {
    return res.status(404).json({ message: "Inventory not found" });
  }
  // Send the fetched inventory data as response
  return res.status(200).json({ inven });
};

// Add a New Inventory Record
const addInventory = async (req, res, next) => {

  // Destructure request body for inventory fields
  const { fertilizer, work, uname, title, disc, imgurl,pest,pestcontral,challenge,userId } =
    req.body;

  let inven;
  // Create a new inventory document instance
  try {
    inven = new Inventory({
     
      fertilizer,
      work,
      uname,
      title,
      disc,
      imgurl,
      pest,
      pestcontral,
      challenge,
      userId,
    }); 

    await inven.save();    // Save the new inventory to the database

  } catch (err) {
    console.log(err);     // Log error if insertion fails
  }

  // If not saved successfully, send error response
  if (!inven) {
    return res.status(404).json({ message: "unable to add Inventory" });
  }

  return res.status(200).json({ inven });          // Return the newly added inventory
};

// Get inventories by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let inven;

  try {
    inven = await Inventory.findById(id);
  } catch (err) {
    console.log(err);
  }

  // not available invens
  if (!inven) {
    return res.status(404).json({ message: "Inventory Not Found" });
  }
  return res.status(200).json({ inven });
};

//Update Inventory
const updateInventory = async (req, res, next) => {
  const id = req.params.id;
  const {  fertilizer, work, uname, title, disc, imgurl,pest,pestcontral,challenge } =
    req.body;

  let invens;

  try {
    invens = await Inventory.findByIdAndUpdate(id, {
     
      fertilizer: fertilizer,
      work: work,
      uname: uname,
      title: title,
      disc: disc,
      imgurl: imgurl,
      pest:pest,
      pestcontral:pestcontral,
      challenge:challenge,

    });
    invens = await invens.save();
  } catch (err) {
    console.log(err);
  }
  if (!invens) {
    return res
      .status(404)
      .json({ message: "Unable to Update Inventory Details" });
  }
  return res.status(200).json({ invens });
};

//Delete Inventory
const deleteInventory = async (req, res, next) => {
  const id = req.params.id;

  let inven;

  try {
    inven = await Inventory.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!inven) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Inventory Details" });
  }
  return res.status(200).json({ inven });
};

exports.getAllInventory = getAllInventory;
exports.addInventory = addInventory;
exports.getById = getById;
exports.updateInventory = updateInventory;
exports.deleteInventory = deleteInventory;