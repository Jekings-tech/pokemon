const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('game', 'name')
      .sort({ createdAt: -1 }); // newest first
    res.status(200).json(products);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, game, productType, language, price, description } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image required' });
    }

    const imageUrls = [];
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'tcg_products' }, (error, result) => {
          if (error) reject(error); else resolve(result);
        });
        stream.end(file.buffer);
      });
      imageUrls.push(result.secure_url);
    }

    const newProduct = new Product({ name, game, productType, language, price, description, images: imageUrls });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.editProduct = async (req, res) => {
  try {
    const { name, game, productType, language, price, description } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    let imageUrls = product.images;
    if (req.files && req.files.length > 0) {
      imageUrls = [];
      for (const file of req.files) {
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream({ folder: 'tcg_products' }, (error, result) => {
            if (error) reject(error); else resolve(result);
          });
          stream.end(file.buffer);
        });
        imageUrls.push(result.secure_url);
      }
    }

    product.name = name || product.name;
    product.game = game || product.game;
    product.productType = productType || product.productType;
    product.language = language || product.language;
    product.price = price || product.price;
    product.description = description || product.description;
    product.images = imageUrls;

    const updated = await product.save();
    res.status(200).json(updated);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};