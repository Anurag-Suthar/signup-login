const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/crm-backend-schema').then(() => {
    console.log("Your mongo DB server connected successfully ")
    app.listen(port, () => {
        console.log("your express server running on this port ", port);

    })
}).catch((error) => {
    console.log("mongo DB having connections problem ", error);
})

const userRouter = require('./routers/UserRoute');
const router = require('./routers/protectedRoute');
app.use('/auth', router)
app.use('/api', userRouter)
app.get('/api/data', (req, res) => {
    // Replace with your logic to fetch or generate data
    const data = { message: 'Hello from Express backend!' };
    console.log("api/data");
    // res.redirect("../")
});