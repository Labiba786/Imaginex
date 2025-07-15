const swaggerJSDoc = require("swagger-jsdoc");

// Determine server URL dynamically
const renderUrl = process.env.RENDER_EXTERNAL_URL?.replace(/\/$/, "");
const localUrl = `http://localhost:${process.env.PORT || 3001}`;

const serverUrls = [
  {
    url: localUrl,
    description: "Local Development Server",
  },
];

if (renderUrl) {
  serverUrls.push({
    url: renderUrl,
    description: "Render Deployment",
  });
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Imaginex API",
      version: "1.0.0",
      description:
        "API documentation for the Imaginex AI Image Generation Project",
    },
    servers: serverUrls,
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Image: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64b2e3c4c56f7f1234567890" },
            prompt: { type: "string", example: "A futuristic city on Mars" },
            style: { type: "string", example: "digital-art" },
            size: { type: "string", example: "square" },
            imageUrl: {
              type: "string",
              example: "https://cdn.imaginex.ai/image123.png",
            },
            user: { type: "string", example: "64a1d1c2f7e9a1234567890b" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Prompt: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64b2f3e9d1c3a01234567891" },
            text: { type: "string", example: "A cyberpunk samurai in Tokyo" },
            user: { type: "string", example: "64a1d1c2f7e9a1234567890b" },
            timesUsed: { type: "integer", example: 3 },
            lastUsedAt: { type: "string", format: "date-time" },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64a1d1c2f7e9a1234567890b" },
            fullName: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            token: {
              type: "string",
              example: "eyJhbGciOiJIUzI1NiIsInR5cCI...",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: [
      { name: "Auth", description: "Authentication routes" },
      { name: "Image", description: "Image generation, storage, and viewing" },
      {
        name: "Gallery",
        description: "User gallery (save, view, manage AI images)",
      },
      { name: "Explore", description: "Explore public image gallery" },
    ],
  },
  apis: ["./src/routes/*.js"], // Update if your route files are elsewhere
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
