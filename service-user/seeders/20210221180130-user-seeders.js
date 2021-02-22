"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        name: "John Doe",
        profession: "Admin Micro",
        role: "admin",
        email: "andibalo213@gmail.com",
        password: await bcrypt.hash("rahasia", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Jane Doe",
        profession: "Web Developer",
        role: "student",
        email: "test@gmail.com",
        password: await bcrypt.hash("rahasia", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
