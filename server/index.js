const express = require('express')
const connectDB = require('./config/db.js');
const app = express()
const dotenv = require('dotenv');
const productRoutes = require('./routes/productsRoutes.js')
const authRoutes = require("./routes/authRoutes.js")
const cors = require('cors');

const port = 3000

// Middleware
app.use(cors());
app.use(express.json());

// load env
dotenv.config();

//connect to database
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', productRoutes);
app.use("/api/auth", authRoutes );
// app.use("/api/user", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Product app listening on port ${port}`)
})
