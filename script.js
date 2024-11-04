function addTask() {
  const taskList = document.getElementById("taskList");
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText === "") return; // Prevent adding empty tasks

  // Create task item
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";

  // Create text container
  const textContainer = document.createElement("div");
  textContainer.className = "task-text-container";
  textContainer.innerHTML = `<span>${taskText}</span>`;

  // Create button container
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  // Edit button
  const editButton = document.createElement("button");
  editButton.className = "edit-button";
  editButton.innerText = "Edit";
  editButton.onclick = () => editTask(taskItem, textContainer);

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-button";
  deleteButton.innerText = "Delete";
  deleteButton.onclick = () => taskItem.remove();

  // Append buttons to button container
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  // Append text container and button container to task item
  taskItem.appendChild(textContainer);
  taskItem.appendChild(buttonContainer);

  // Add task item to task list
  taskList.appendChild(taskItem);

  // Clear input field
  taskInput.value = "";
}

function editTask(taskItem, textContainer) {
  // Hide the current text
  const currentText = textContainer.querySelector("span").textContent;
  textContainer.querySelector("span").style.display = "none";

  // Create an input field with the current task text
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.value = currentText;
  inputField.className = "edit-input";
  textContainer.appendChild(inputField);
  
  // Focus on the input field
  inputField.focus();

  // Handle input field blur (when user clicks away) or presses Enter
  inputField.addEventListener("blur", () => saveEdit(inputField, textContainer));
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit(inputField, textContainer);
  });
}

function saveEdit(inputField, textContainer) {
  const newTaskText = inputField.value.trim();

  // Update the task text if it's not empty
  if (newTaskText !== "") {
    textContainer.querySelector("span").textContent = newTaskText;
  }

  // Remove the input field and show the updated text
  inputField.remove();
  textContainer.querySelector("span").style.display = "inline";
}


function sortTasks(order) {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children);

  tasks.sort((a, b) => {
    const textA = a.querySelector(".task-text-container span").textContent.toLowerCase();
    const textB = b.querySelector(".task-text-container span").textContent.toLowerCase();
    if (order === 'asc') {
      return textA.localeCompare(textB);
    } else if (order === 'desc') {
      return textB.localeCompare(textA);
    }
  });

  // Clear the current list and append sorted tasks
  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(task));
}
