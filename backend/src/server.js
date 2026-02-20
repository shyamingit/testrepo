const app = require('./app');
const connectDb = require('./config/db');
const { port } = require('./config/env');

const startServer = async () => {
  await connectDb();
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`FounderFocus API running on port ${port}`);
  });
};

startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Server startup failed:', error);
  process.exit(1);
});
