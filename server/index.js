require('dotenv').config();
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./routes/user")
const path = require('path');
const cookieParser = require("cookie-parser")

// Set NODE_ENV for production cookie settings
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production'; // Default to production for deployed environments
}

app.use(bodyParser.json())
app.use(cookieParser())

// Enhanced CORS configuration for production
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "http://localhost:3001",
    "https://internportal-gules.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

// https://internportal-gules.vercel.app

// use the client app
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//connecting to mongobd using Mongoose
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use("/auth", router)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
    console.log(`Environment: ${process.env.NODE_ENV}`)
})