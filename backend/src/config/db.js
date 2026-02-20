const mongoose = require('mongoose');
const { mongodbUri } = require('./env');

const connectDb = async () => {
  await mongoose.connect(mongodbUri);
};

module.exports = connectDb;
