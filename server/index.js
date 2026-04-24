const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { default: mongoose } = require('mongoose');


dotenv.config();
const app = express();
app.use(cors());

//Connect MongoDB 
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.error('Error Connecting to MongoDB:', error);
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT,()=>{
    console.log(`Server Is Running on Port ${PORT}`);
});