const { Item } = require("../../models");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, todoId } = req.body;
      if (!name) {
        res.status(400).json({
          status: "error",
          message: "Item's name must be filled!",
        });
      } else if (!todoId) {
        res.status(400).json({
          status: "error",
          message: "Item's todoId must be filled!",
        });
      } else {
        await Item.create({ name, todoId });
        res.status(201).json({
          status: "success",
          message: "Item successfully created!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  getDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Item.findOne({
        attributes: ["id", "name", "todoId"],
        where: {
          id,
        },
      });

      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, todoId } = req.body;

      const item = await Item.findOne({
        attributes: ["id", "name", "todoId"],
        where: {
          id,
        },
      });
      if (!item) {
        res.status(404).json({
          status: "error",
          message: "Item not found!",
        });
      } else {
        if (!name) {
          res.status(400).json({
            status: "error",
            message: "Item's name must be filled!",
          });
        } else if (!todoId) {
          res.status(400).json({
            status: "error",
            message: "Item's todoId must be filled!",
          });
        } else {
          await item.update(
            { name, todoId },
            {
              where: { id },
            }
          );
          res.status(200).json({
            status: "success",
            message: "Item has been updated!",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ where: { id } });
      if (!item)
        return res
          .status(404)
          .json({ status: "error", message: "Item not found!" });
      await item.destroy({ where: { id } });
      res.status(200).json({
        status: "success",
        message: "Item has been deleted!",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
  move: async (req, res) => {
    try {
      const { id } = req.params;
      const { targetTodoId } = req.body;

      const item = await Item.findOne({ where: { id: id } });

      if (!item) {
        res.status(404).json({ status: "error", message: "Item not found!" });
      } else {
        item.todoId = targetTodoId;
        await item.save();
        res.status(200).json({
          status: "success",
          message: "Item has been moved!",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};
