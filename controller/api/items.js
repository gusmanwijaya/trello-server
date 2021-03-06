const { Item } = require("../../models");

module.exports = {
  create: async (req, res) => {
    try {
      const { name, TodoId } = req.body;
      if (!name) {
        res.status(400).json({
          status: "error",
          message: "Item's name must be filled!",
        });
      } else if (!TodoId) {
        res.status(400).json({
          status: "error",
          message: "Item's TodoId must be filled!",
        });
      } else {
        await Item.create({ name, TodoId });
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
        attributes: ["id", "name", "TodoId"],
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
      const { name, TodoId } = req.body;

      const item = await Item.findOne({
        attributes: ["id", "name", "TodoId"],
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
        } else if (!TodoId) {
          res.status(400).json({
            status: "error",
            message: "Item's TodoId must be filled!",
          });
        } else {
          await item.update(
            { name, TodoId },
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
        item.TodoId = targetTodoId;
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
