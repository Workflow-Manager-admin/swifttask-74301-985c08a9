const todoService = require('../services/todo');

class TodoController {
  getAll(req, res) {
    const todos = todoService.getAll();
    res.status(200).json(todos);
  }

  getById(req, res) {
    const id = parseInt(req.params.id, 10);
    const todo = todoService.getById(id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }

  create(req, res) {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: 'Text is required' });
    }
    const newTodo = todoService.create(text);
    res.status(201).json(newTodo);
  }

  update(req, res) {
    const id = parseInt(req.params.id, 10);
    const { text, completed } = req.body;
    const updatedTodo = todoService.update(id, text, completed);
    if (updatedTodo) {
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }

  delete(req, res) {
    const id = parseInt(req.params.id, 10);
    const success = todoService.delete(id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  }
}

module.exports = new TodoController();
