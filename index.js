const app = require('./server');
const connectDB = require('./config/db');

connectDB(); // connect to DB before listening

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});