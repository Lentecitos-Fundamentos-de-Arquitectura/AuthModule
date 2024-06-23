const swaggerJSDoc = require('swagger-jsdoc');
const swagerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AUTH API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'https://auth-lentecitos.fly.dev/',
                description: 'Deploy server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
}

const swwaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
    app.use('/api-docs', swagerUi.serve, swagerUi.setup(swwaggerSpec));
}

module.exports = setupSwagger;