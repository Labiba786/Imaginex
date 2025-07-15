const express = require('express');
const router = express.Router();
const {
  getExploreStats,
  getTrendingImages,
  getFeaturedArtists,
  getRecentImages
} = require('../controllers/exploreController');

/**
 * @swagger
 * tags:
 *   name: Explore
 *   description: Public image gallery and stats
 */

/**
 * @swagger
 * /api/explore/stats:
 *   get:
 *     summary: Get overall explore statistics
 *     tags: [Explore]
 *     responses:
 *       200:
 *         description: Statistics including active artists, views, likes, and generated images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 activeArtists:
 *                   type: integer
 *                 totalViews:
 *                   type: integer
 *                 totalLikes:
 *                   type: integer
 *                 totalImages:
 *                   type: integer
 */
router.get('/stats', getExploreStats);

/**
 * @swagger
 * /api/explore/trending:
 *   get:
 *     summary: Get trending images (by likes or views)
 *     tags: [Explore]
 *     responses:
 *       200:
 *         description: List of trending images
 */
router.get('/trending', getTrendingImages);

/**
 * @swagger
 * /api/explore/featured-artists:
 *   get:
 *     summary: Get featured artists
 *     tags: [Explore]
 *     responses:
 *       200:
 *         description: List of featured artists
 */
router.get('/featured-artists', getFeaturedArtists);

/**
 * @swagger
 * /api/explore/recent:
 *   get:
 *     summary: Get recent images
 *     tags: [Explore]
 *     responses:
 *       200:
 *         description: List of recently uploaded images
 */
router.get('/recent', getRecentImages);

module.exports = router;
