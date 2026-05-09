const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "TaskFlow API",
      version: "1.0.0",
      description: "Task Management API with JWT Authentication and RBAC"
    },

    servers: [
      {
        url: "https://taskflow-api-i4n9.onrender.com"

      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },

  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;