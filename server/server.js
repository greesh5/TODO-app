import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import Todo from './models/Todo.js';
const app = express();
app.use(express.json());
app.use(cors());
connect('mongodb+srv://greesh_5:munny123@cluster0.lvfzzc5.mongodb.net/',  {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch(console.error);
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos.map((todo) => ({ id: todo._id, text: todo.text, completed: todo.completed })));
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving todos' });
  }
});
app.post('/todo/new', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await Todo.create({ text, completed: false });
    res.json({
      id: todo._id,
      text: todo.text,
      completed: todo.completed,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});
app.delete('/todo/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    res.json({
      id: todo._id,
      text: todo.text,
      completed: todo.completed,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});
app.put('/todo/complete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    // Toggle the completion status
    todo.completed = !todo.completed;
    await todo.save();
    res.json({
      id: todo._id,
      text: todo.text,
      completed: todo.completed,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});
export default app;