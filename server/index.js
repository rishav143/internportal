require('dotenv').config();
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./routes/user")
const path = require('path');
const cookieParser = require("cookie-parser")
app.use(bodyParser.json())
app.use(cookieParser())

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
app.listen(3000, () => {
    console.log("server is running on port 3000")
})