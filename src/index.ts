// to make unique id for task
import { v4 as uuidV4 } from 'uuid';

// to add task
function addTaskItem(task: Task) {
  // to create some element
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    console.log(task);
    saveTasks();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

// for save task in localStorage
function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(task));
}

// to load the task
function loadTasks(): Task[] {
  // because don't get error with "JSON.parse" because return string
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}

// this to make Object to save task information in it
// and this is a new type to use in "addTaskItem" function
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

// to make list
// * between the <> this is type element of html
const list = document.querySelector<HTMLUListElement>('#list');
// to add title
const form = document.getElementById('new-task-form') as HTMLFormElement;
// to task adding for "list"
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const task: Task[] = loadTasks();
task.forEach(addTaskItem);
// to listing
form?.addEventListener('submit', (e) => {
  // The preventDefault() method cancels the event if it is cancelable,
  // meaning that the default action that belongs to the event will not occur.
  e.preventDefault();
  // if the input from user are null don't do thing
  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  task.push(newTask);
  addTaskItem(newTask);
  input.value = '';
});