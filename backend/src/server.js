const app = require('./app');
const sequelize = require('./config/database');
const { connectMongo } = require('./config/mongo');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    
    await connectMongo();

    const adminExists = await User.findOne({ where: { email: 'admin@admin.com' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin',
        email: 'admin@admin.com',
        password: hashedPassword,
        role: 'admin',
      });
      console.log('Default admin created (admin@admin.com / admin123)');
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
