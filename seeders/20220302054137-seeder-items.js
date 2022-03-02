"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Items",
      [
        {
          name: "New website perintis karya",
          TodoId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Learn Laravel 9",
          TodoId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
