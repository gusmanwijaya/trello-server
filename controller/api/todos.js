const { Todo, Item } = require("../../models");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await Todo.findAll({
        attributes: ["id", "name"],
        include: {
          model: Item,
          attributes: ["id", "name", "todoId"],
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
  create: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({
          status: "error",
          message: "Todo's name must be filled!",
        });
      } else {
        await Todo.create({ name });
        res.status(201).json({
          status: "success",
          message: "Todo successfully created!",
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

      const data = await Todo.findOne({
        attributes: ["id", "name"],
        include: {
          model: Item,
          attributes: ["id", "name", "todoId"],
        },
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
      const { name } = req.body;

      const todo = await Todo.findOne({
        attributes: ["id", "name"],
        where: {
          id,
        },
      });
      if (!todo) {
        res.status(404).json({
          status: "error",
          message: "Todo not found!",
        });
      } else {
        if (!name) {
          res.status(400).json({
            status: "error",
            message: "Todo's name must be filled!",
          });
        } else {
          await todo.update(
            { name },
            {
              where: { id },
            }
          );
          res.status(200).json({
            status: "success",
            message: "Todo has been updated!",
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
      const todo = await Todo.findOne({ where: { id } });
      if (!todo)
        return res
          .status(404)
          .json({ status: "error", message: "Todo not found!" });
      await todo.destroy({ where: { id } });
      res.status(200).json({
        status: "success",
        message: "Todo has been deleted!",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};
