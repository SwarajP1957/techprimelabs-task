const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const createUser = async () => {
  const hashedPassword = await bcrypt.hash('yourpassword', 10);
  const user = new User({
    email: 'test@example.com',
    password: hashedPassword,
  });

  await user.save();
  console.log('User created');
  mongoose.connection.close();
};

createUser();
