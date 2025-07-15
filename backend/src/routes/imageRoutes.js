// const express = require('express');
// const router = express.Router();

// const {
//   generateImage,
//   getUserImages,
// } = require('../controllers/imageController');

// const protect = require('../middleware/authMiddleware');

// // Debug log
// console.log('Loading image routes...');

// // ==============================
// // Swagger Documentation
// // ==============================

// /**
//  * @swagger
//  * tags:
//  *   name: Image
//  *   description: Image generation and management
//  */

// /**
//  * @swagger
//  * /api/image/generate:
//  *   post:
//  *     summary: Generate an image from a prompt, style, and size
//  *     tags: [Image]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - prompt
//  *               - style
//  *               - size
//  *             properties:
//  *               prompt:
//  *                 type: string
//  *                 example: "Astronaut riding a horse on Mars"
//  *               style:
//  *                 type: string
//  *                 enum: [Realistic, Abstract, Cartoon, Anime, Digital Art, Cyberpunk]
//  *                 example: "Realistic"
//  *               size:
//  *                 type: string
//  *                 enum: [Square, Portrait, Landscape]
//  *                 example: "Square"
//  *     responses:
//  *       200:
//  *         description: Image generated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 imageUrl:
//  *                   type: string
//  *                   example: "https://example.com/generated-image.png"
//  *                 prompt:
//  *                   type: string
//  *                 style:
//  *                   type: string
//  *                 size:
//  *                   type: string
//  */

// /**
//  * @swagger
//  * /api/image/mine:
//  *   get:
//  *     summary: Get the logged-in user's saved images
//  *     tags: [Image]
//  *     security:
//  *       - bearerAuth: []
//  *     responses:
//  *       200:
//  *         description: List of user's images
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Image'
//  */

// // ==============================
// // Routes
// // ==============================

// router.post('/generate', protect, generateImage);     // Protected generation
// router.get('/mine', protect, getUserImages);          // Protected fetch

// // Test route
// router.get('/test', (req, res) => {
//   res.json({ message: 'Image route working ✅' });
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
  generateImage,
  getUserImages,
} = require('../controllers/imageController');

const protect = require('../middleware/authMiddleware');

// ==============================
// Swagger Documentation
// ==============================

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: Image generation and management
 */

/**
 * @swagger
 * /api/image/generate:
 *   post:
 *     summary: Generate an image from a prompt, style, and size
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *               - style
 *               - size
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "Astronaut riding a horse on Mars"
 *               style:
 *                 type: string
 *                 enum: [Realistic, Abstract, Cartoon, Anime, Digital Art, Cyberpunk]
 *                 example: "Digital Art"
 *               size:
 *                 type: string
 *                 enum: [Square, Portrait, Landscape]
 *                 example: "Square"
 *     responses:
 *       200:
 *         description: Binary image data (image/png or image/jpeg)
 *         content:
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Prompt, style, and size are required."
 *       500:
 *         description: Failed to generate image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to generate image."
 */

/**
 * @swagger
 * /api/image/mine:
 *   get:
 *     summary: Get the logged-in user's saved images
 *     tags: [Image]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's saved image metadata
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *       500:
 *         description: Failed to fetch user images
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch user images."
 */

// ==============================
// Routes
// ==============================

router.post('/generate', protect, generateImage);
router.get('/mine', protect, getUserImages);

// Test route (optional)
router.get('/test', (req, res) => {
  res.json({ message: 'Image route working ✅' });
});

module.exports = router;
