const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

// configure app to use .env file
dotenv.config();

// get port from env file
const { PORT } = process.env;

// connect to database
let DB = process.env.DEV_DB_URI

if(process.env.NODE_ENV === "production") {
    DB = process.env.PROD_DB_URI.replace(
        '<password>',
        process.env.PROD_DB_PASSWORD
    ); 
}

// listen to desired port
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
    console.log(DB)

    try {

        mongoose.set('strictQuery', true)
        mongoose.connect(
            DB,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,                
            }
        ).then(() => console.log(" Database is connected"))
        .catch(e => console.log(e))
    
    } catch (e) {
        console.log("could not connect");
    }
})