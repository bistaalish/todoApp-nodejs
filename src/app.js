// app.js

// Initiating Dotenv
require('dotenv').config();
const express = require("express"); // adding express in nodejs
const morgan = require("morgan"); // Import the morgan middleware
const logger = require("./utils/logger");
const authRoute = require('./routes/auth'); // Import the logger we created in the previous step
const cors = require('cors') // Importing cors
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser")
const cookieSession = require("cookie-sessions")
const config = require('./config/config')
const taskApi = require("./routes/api")
const {checkAuth} = require("./middlewares/checkAuth")

// Initializing the express module
const app = express();
// Apply rate limiting middleware to all requests
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  });
app.use(limiter);
// Allowing JSON input to be parsed
app.use(express.json());
app.use(cookieParser()); // Use the cookie-parser middleware before csurf

// Read the allowed origins from the .env file
const allowedOrigins = config.ALLOWED_ORIGINS.split(",");
// Use the cors middleware to allow requests from the specified origins
app.use(cors({ origin: allowedOrigins }));
app.use(cookieSession({
  name: 'session',
  secret: [config.COOKIE_SECRET],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

  // Log HTTP requests using morgan
app.use(morgan("combined", { stream: { write: (message) => logger.info(message) } }));

// Test route
app.get("/",(req,res)=>{
    return res.status(200).json({"test":"successful"})
})
// Mount the auth route at /auth
app.use('/auth', authRoute);
// Todo APi
app.use("/api",checkAuth,taskApi);

// Start the server
const port = config.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app
