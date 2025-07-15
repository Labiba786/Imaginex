const Image = require('../models/Image');
const User = require('../models/User');

// 1. Explore Images
const exploreImages = async (req, res) => {
  try {
    const images = await Image.find()
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(30);

    res.status(200).json(images);
  } catch (err) {
    console.error('Explore Images Error:', err);
    res.status(500).json({ error: 'Failed to fetch explore images' });
  }
};

// 2. Explore Stats
const getExploreStats = async (req, res) => {
  try {
    const [activeArtists, totalViews, totalLikes, totalImages] = await Promise.all([
      Image.distinct('user').then(users => users.length),
      Image.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]).then(res => res[0]?.total || 0),
      Image.aggregate([{ $group: { _id: null, total: { $sum: '$likes' } } }]).then(res => res[0]?.total || 0),
      Image.countDocuments()
    ]);

    res.status(200).json({ activeArtists, totalViews, totalLikes, totalImages });
  } catch (err) {
    console.error('Explore Stats Error:', err);
    res.status(500).json({ error: 'Failed to fetch explore stats' });
  }
};

// 3. Trending Images
const getTrendingImages = async (req, res) => {
  try {
    const trending = await Image.find()
      .populate('user', 'username')
      .sort({ likes: -1 }) // You can switch to { views: -1 } if preferred
      .limit(10);

    res.status(200).json(trending);
  } catch (err) {
    console.error('Trending Images Error:', err);
    res.status(500).json({ error: 'Failed to fetch trending images' });
  }
};

// 4. Featured Artists
const getFeaturedArtists = async (req, res) => {
  try {
    const artists = await User.find({ isFeatured: true })
      .select('username bio followers category')
      .limit(10);

    res.status(200).json(artists);
  } catch (err) {
    console.error('Featured Artists Error:', err);
    res.status(500).json({ error: 'Failed to fetch featured artists' });
  }
};

// 5. Recent Images
const getRecentImages = async (req, res) => {
  try {
    const recent = await Image.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json(recent);
  } catch (err) {
    console.error('Recent Images Error:', err);
    res.status(500).json({ error: 'Failed to fetch recent images' });
  }
};

module.exports = {
  exploreImages,
  getExploreStats,
  getTrendingImages,
  getFeaturedArtists,
  getRecentImages
};