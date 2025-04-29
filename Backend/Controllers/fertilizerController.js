// controllers/fertilizerController.js

const fs = require('fs');
const Fertilizer = require('../models/fertilizerModel');

const addFertilizer = async (req, res) => {
    try {
        const imgPath = req.file.path;
        const imgData = fs.readFileSync(imgPath); // Read file as Buffer
        const imgBase64 = imgData.toString('base64'); // Convert to Base64 string

        const newFertilizer = new Fertilizer({
            title: req.body.title,
            des: req.body.des,
            price: req.body.price,
            stock: req.body.stock,
            image: imgBase64,
        });

        await newFertilizer.save();
        fs.unlinkSync(imgPath); // Delete the file after saving to database

        res.json({ message: 'Fertilizer added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllFertilizers = async (req, res) => {
    try {
        const fertilizers = await Fertilizer.find();
        res.json(fertilizers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFertilizerById = async (req,res) => {
    try {
        
        const fertilizer = await Fertilizer.findById(req.params.id);

        if(!fertilizer){
            return res.status(404).json({message:'Fertilizer not found'});
        }

        res.json(fertilizer);

    } catch (error) {
        res.status(500).json({error:error.message})
        
    }

}




const updateFertilizer = async (req, res) => {
    try {
        const fertilizer = await Fertilizer.findById(req.params.id);

        if (!fertilizer) {
            return res.status(404).json({ message: 'Fertilizer not found' });
        }

        fertilizer.title = req.body.title;
        fertilizer.des = req.body.des;
        fertilizer.price = req.body.price;
        fertilizer.stock = req.body.stock;

        if (req.file) {
            const imgPath = req.file.path;
            const imgData = fs.readFileSync(imgPath);
            fertilizer.image = imgData.toString('base64');
            fs.unlinkSync(imgPath);
        }

        await fertilizer.save();
        res.json({ message: 'Fertilizer updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteFertilizer = async (req, res) => {
    try {
        const fertilizer = await Fertilizer.findByIdAndDelete(req.params.id);

        if (!fertilizer) {
            return res.status(404).json({ message: 'Fertilizer not found' });
        }

        res.json({ message: 'Fertilizer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {addFertilizer,getAllFertilizers,updateFertilizer,deleteFertilizer,getFertilizerById}