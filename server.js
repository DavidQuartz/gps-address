// load env variables
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 8008;

let server = require('http').createServer(app);

server.listen(port, () => console.log(`Server running on ${port}`));

// Catching unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log('trace', err);
  // console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION: 💥 Shutting down...');
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('👋 Sigterm received! Closing application gracefully');
  server.close(() => console.log('💥 Process terminated!'));
});
