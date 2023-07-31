import { Schema, model } from 'mongoose';
const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const Todo = model('Todo', TodoSchema);
export default Todo;