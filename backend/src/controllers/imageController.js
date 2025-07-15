// const axios = require('axios');
// const Image = require('../models/Image');
// const Prompt = require('../models/Prompt');

// // POST /api/image/generate
// const generateImage = async (req, res) => {
//   const { prompt, style, size } = req.body;
//   const userId = req.user?.id;
//   const userJwtToken = req.headers.authorization?.split(' ')[1]; // Get JWT from frontend request

//   if (!prompt || !style || !size) {
//     return res.status(400).json({ error: "Prompt, style, and size are required." });
//   }

//   try {
//     // Forward the request to the Flask API with the user's JWT
//     const flaskResponse = await axios.post(
//       'http://127.0.0.1:5000/api/generate/image',
//       { prompt, style, size },
//       {
//         headers: {
//           Authorization: `Bearer ${userJwtToken}`,
//         },
//         responseType: 'arraybuffer', // If you want to handle image binary
//       }
//     );

//     // Forward the image or response back to the frontend
//     res.set('Content-Type', flaskResponse.headers['content-type']);
//     res.send(flaskResponse.data);

//   } catch (error) {
//     console.error("❌ Error generating image:", error.message);
//     res.status(500).json({ error: "Failed to generate image." });
//   }
// };

// // GET /api/image/mine
// const getUserImages = async (req, res) => {
//   const userId = req.user?.id;

//   try {
//     const images = await Image.find({ user: userId }).sort({ createdAt: -1 });
//     res.status(200).json(images);
//   } catch (err) {
//     console.error("❌ Error fetching user images:", err.message);
//     res.status(500).json({ error: "Failed to fetch user images." });
//   }
// };

// module.exports = {
//   generateImage,
//   getUserImages,
// };

const axios = require('axios');
const Image = require('../models/Image');
const Prompt = require('../models/Prompt');
const cloudinary = require('../config/cloudinary'); // Assuming you have a Cloudinary config file

// POST /api/image/generate
const generateImage = async (req, res) => {
  const { prompt, style, size } = req.body;
  const userId = req.user?.id;
  const userJwtToken = req.headers.authorization?.split(' ')[1];

  if (!prompt || !style || !size) {
    return res.status(400).json({ error: "Prompt, style, and size are required." });
  }

  try {
    // 1. Request image from Flask API (binary)
    const flaskResponse = await axios.post(
      'http://127.0.0.1:5000/api/generate/image',
      { prompt, style, size },
      {
        headers: { Authorization: `Bearer ${userJwtToken}` },
        responseType: 'arraybuffer',
      }
    );

    // 2. Convert Buffer to base64 data URI
    const imageBase64 = Buffer.from(flaskResponse.data, 'binary').toString('base64');
    const dataUri = `data:${flaskResponse.headers['content-type']};base64,${imageBase64}`;

    // 3. Upload to Cloudinary
    const cloudinaryRes = await cloudinary.uploader.upload(dataUri, {
      folder: 'imaginex',
      resource_type: 'image',
    });

    const imageUrl = cloudinaryRes.secure_url;

    // 4. Save prompt & image in DB
    const existingPrompt = await Prompt.findOne({ text: prompt, user: userId });

    if (existingPrompt) {
      existingPrompt.timesUsed += 1;
      existingPrompt.lastUsedAt = Date.now();
      await existingPrompt.save();
    } else {
      await Prompt.create({ text: prompt, user: userId });
    }

    await Image.create({
      prompt,
      style,
      size,
      imageUrl,
      user: userId,
    });

    // 5. Respond with Cloudinary image URL
    res.status(200).json({ imageUrl });

  } catch (error) {
    console.error("❌ Error generating/saving image:", error.message);
    res.status(500).json({ error: "Failed to generate image." });
  }
};


// GET /api/image/mine
const getUserImages = async (req, res) => {
  const userId = req.user?.id;

  try {
    const images = await Image.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error("❌ Error fetching user images:", err.message);
    res.status(500).json({ error: "Failed to fetch user images." });
  }
};

module.exports = {
  generateImage,
  getUserImages,
};
