const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/founderfocus',
  jwtSecret: process.env.JWT_SECRET || 'development_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  openAiApiKey: process.env.OPENAI_API_KEY,
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:5173'
};
