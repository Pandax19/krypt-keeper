const sequelize = require('../config/connection');
const { Event, User } = require('../models');

const userData = require('./userSeeds.json');
const projectData = require('./eventSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of projectData) {
    await Event.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

};

seedDatabase()

module.exports = seedDatabase;
