const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

function newTodo() {
  let newTodo = prompt("What is the new TODO?", "New TODO.");
  createNewTodoElement(newTodo);
  recomputeItemCount();
  recomputeUncheckedCount();
}

function createNewTodoElement(todo) {
  const entryChkbox = document.createElement('input');
  entryChkbox.type = 'checkbox';
  entryChkbox.classList.add(classNames.TODO_CHECKBOX);
  entryChkbox.addEventListener('change', recomputeUncheckedCount);

  const entryDltBtn = document.createElement('button');
  entryDltBtn.innerText = "Delete"
  entryDltBtn.classList.add(classNames.TODO_DELETE);

  const entryText = document.createElement('span');
  entryText.appendChild(document.createTextNode(todo));
  entryText.classList.add(classNames.TODO_TEXT);

  const entry = document.createElement('li');
  entry.appendChild(entryChkbox);
  entry.appendChild(entryText);
  entry.appendChild(entryDltBtn);
  entryDltBtn.addEventListener('click', () => deleteTodoElement(entry));
  entry.classList.add(classNames.TODO_ITEM);

  list.appendChild(entry);
}

function deleteTodoElement(entry) {
  list.removeChild(entry);
  recomputeItemCount();
  recomputeUncheckedCount();
}

function recomputeItemCount() {
  const itemCount = list.getElementsByClassName(classNames.TODO_ITEM).length;
  console.log("Recomputed item count: " + itemCount);
  itemCountSpan.innerText = itemCount;
}

function recomputeUncheckedCount() {
  let uncheckedCount = 0;
  [...list.getElementsByClassName(classNames.TODO_CHECKBOX)].forEach(element => {
    if (element instanceof HTMLInputElement && element.type === 'checkbox') {
      uncheckedCount += element.checked ? 0 : 1;
    }
  });

  console.log("Recomputed unchecked count: " + uncheckedCount);
  uncheckedCountSpan.innerText = uncheckedCount;
}
