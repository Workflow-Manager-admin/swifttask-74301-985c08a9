let todos = [
  { id: 1, text: 'Learn Node.js', completed: false },
  { id: 2, text: 'Create a to-do app', completed: false },
];
let nextId = 3;

class TodoService {
  getAll() {
    return todos;
  }

  getById(id) {
    return todos.find(todo => todo.id === id);
  }

  create(text) {
    const newTodo = {
      id: nextId++,
      text,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  }

  update(id, text, completed) {
    const todo = this.getById(id);
    if (todo) {
      todo.text = text !== undefined ? text : todo.text;
      todo.completed = completed !== undefined ? completed : todo.completed;
      return todo;
    }
    return null;
  }

  delete(id) {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = new TodoService();
