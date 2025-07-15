const express = require('express');
const { getGalleryImages } = require('../controllers/galleryController');

const router = express.Router();

/**
 * @swagger
 * /api/gallery:
 *   get:
 *     summary: Get gallery images with filters and search
 *     tags: [Gallery]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search text in image prompt
 *       - in: query
 *         name: style
 *         schema:
 *           type: string
 *         description: Filter by image style (e.g., anime, realistic)
 *     responses:
 *       200:
 *         description: List of images
 */

router.get('/', getGalleryImages);

module.exports = router;
