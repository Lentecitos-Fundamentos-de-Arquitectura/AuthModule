const app = require('./app')
const port = process.env.PORT || 3000;
const setupSwagger = require('./swagger');

setupSwagger(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 