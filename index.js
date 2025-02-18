const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const cookieParser = require('cookie-parser');

const app = express();

connectDb();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
    console.log("Running");
    res.send("Server is running");
});

// Run on port 8000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
