import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.1.0',
    failOnErrors: true,
    info: {
      title: 'Encurtando API',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3002' }],
  },
  apis: ['**/*.ts'],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
