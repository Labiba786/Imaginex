const Image = require('../models/Image');

// GET /api/gallery?search=&style=
const getGalleryImages = async (req, res) => {
  const { search = '', style = '' } = req.query;

  const query = {};

  if (search) {
    query.prompt = { $regex: search, $options: 'i' }; // case-insensitive
  }

  if (style) {
    query.style = style;
  }

  try {
    const images = await Image.find(query)
      .populate('user', 'username')
      .sort({ createdAt: -1 }) // Default sort: latest first
      .select('-__v');

    res.status(200).json(images);
  } catch (err) {
    console.error("❌ Failed to fetch gallery images:", err.message);
    res.status(500).json({ error: "Something went wrong while fetching images." });
  }
};

module.exports = { getGalleryImages };
