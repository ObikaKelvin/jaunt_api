const dotenv = require('dotenv');

const app = require('./app');

// configure app to use .env file
dotenv.config();

// get port from env file
const { PORT } = process.env;

// listen to desired port
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})