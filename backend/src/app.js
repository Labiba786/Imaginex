const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");

const imageRoutes = require("./routes/imageRoutes");
const authRoutes = require("./routes/authRoutes");
const exploreRoutes = require("./routes/exploreRoutes");
const galleryRoutes = require("./routes/galleryRoutes");

const { port } = require("./config/config");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Define allowed origins
const allowedOrigins = [
  "https://imaginex-orpin.vercel.app",
  "http://localhost:3000", // For local development
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ==============================
// Middleware
// ==============================
app.use(morgan("dev"));
app.use(cors(corsOptions)); // Apply the CORS configuration
app.use(express.json());

// ==============================
// API Routes
// ==============================
app.use("/api/image", imageRoutes); // 🔧 Image generation, uploads
app.use("/api/auth", authRoutes); // 🔒 Auth
app.use("/api/explore", exploreRoutes); // 🌍 Public feed
app.use("/api/gallery", galleryRoutes); // 🖼️ Gallery

// ==============================
// Swagger Docs
// ==============================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ==============================
// Root Route (Safe for Render)
// ==============================
app.get("/", (req, res) => {
  res.send("🚀 Imaginex Backend API is running!");
});

// ==============================
// Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
});

// ==============================
// Server Start (Dynamic Logs)
// ==============================
app.listen(port, () => {
  const baseUrl =
    process.env.RENDER_EXTERNAL_URL?.replace(/\/$/, "") ||
    `http://localhost:${port}`;

  console.log(`🚀 Server running at: ${baseUrl}`);
  console.log(`📚 API Docs available at: ${baseUrl}/api-docs`);
});
